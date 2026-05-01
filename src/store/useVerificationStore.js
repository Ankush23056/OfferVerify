import { create } from 'zustand';
import API_BASE_URL from '../config/api';

export const useVerificationStore = create((set, get) => ({
  status: 'idle',
  errorMsg: null,
  file: null,
  result: null,
  uploadProgress: 0,
  setStatus: (status) => set({ status }),
  setFile: (file) => set({ file }),
  setResult: (result) => set({ result }),
  setUploadProgress: (progress) => set({ uploadProgress: progress }),
  reset: () => set({ status: 'idle', file: null, result: null, errorMsg: null, uploadProgress: 0 }),
  verifyText: async (text) => {
    set({ status: 'analyzing', errorMsg: null, file: null });
    try {
      const response = await fetch(`${API_BASE_URL}/api/verify-offer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Verification failed');
      
      set({ status: 'success', result: data });
    } catch (e) {
      set({ status: 'error', errorMsg: e.message });
    }
  },
  startVerification: async (file) => {
    set({ file, status: 'uploading', errorMsg: null, uploadProgress: 0 });

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Perform upload with XMLHttpRequest to track progress
      const xhr = new XMLHttpRequest();
      
      const response = await new Promise((resolve, reject) => {
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded * 100) / event.total);
            set({ uploadProgress: progress });
            // Once fully uploaded and currently in 'uploading' state, we transition smoothly to extracting
            if (progress === 100 && get().status === 'uploading') {
              set({ status: 'extracting' });
              // After a few seconds of server processing, switch to "analyzing" to show progression
              setTimeout(() => {
                if (get().status === 'extracting') {
                  set({ status: 'analyzing' });
                }
              }, 2500);
            }
          }
        });

        xhr.addEventListener('load', () => {
          resolve({
            ok: xhr.status >= 200 && xhr.status < 300,
            status: xhr.status,
            text: xhr.responseText
          });
        });

        xhr.addEventListener('error', () => {
          reject(new Error('Network error occurred during upload'));
        });

        xhr.addEventListener('abort', () => {
          reject(new Error('Upload aborted'));
        });

        xhr.open('POST', `${API_BASE_URL}/api/verify-offer`);
        xhr.send(formData);
      });

      set({ status: 'analyzing' });

      const textResponse = response.text;
      let data;
      try {
        data = JSON.parse(textResponse);
      } catch (err) {
        console.error("Failed to parse JSON. Raw response from server:", textResponse.substring(0, 200));
        if (textResponse.includes('<!doctype html>')) {
          throw new Error(`Server returned an HTML page instead of API data. The server may have crashed or gone to sleep. Try refreshing the page!`);
        }
        throw new Error(`Server returned invalid response (Status ${response.status}). Are you disconnected?`);
      }

      if (!response.ok) {
        throw new Error(data?.error || `Failed to verify document (Status ${response.status})`);
      }

      // Artificial slight delay so "analyzing" step is visible for at least a split second
      setTimeout(() => {
        set({
           status: 'success',
           result: data,
        });
      }, 800);

    } catch (e) {
      console.error(e);
      set({ status: 'error', errorMsg: e.message || 'An unknown error occurred.' });
    }
  }
}));
