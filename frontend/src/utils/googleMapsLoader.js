let isLoading = false;
let isLoaded = false;
let loadPromise = null;

export const loadGoogleMapsScript = () => {
  if (isLoaded) return Promise.resolve();
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    if (window.google?.maps?.places) {
      isLoaded = true;
      resolve();
      return;
    }

    if (isLoading) {
      const checkLoaded = setInterval(() => {
        if (window.google?.maps?.places) {
          isLoaded = true;
          clearInterval(checkLoaded);
          resolve();
        }
      }, 100);
      return;
    }

    isLoading = true;
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDyKNgjj3-qvZcqTNApY7tSuzauAPZ4YM8&libraries=places';
    script.async = true;

    script.onload = () => {
      isLoaded = true;
      isLoading = false;
      resolve();
    };

    script.onerror = () => {
      isLoading = false;
      loadPromise = null;
      reject(new Error('Failed to load Google Maps script'));
    };

    document.head.appendChild(script);
  });

  return loadPromise;
};
