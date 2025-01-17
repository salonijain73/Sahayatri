const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    // Check if script is already loaded
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;

    script.addEventListener('load', resolve);
    script.addEventListener('error', reject);

    document.head.appendChild(script);
  });
};

export const loadGoogleMapsScript = async () => {
  const GOOGLE_MAPS_API_KEY = 'AIzaSyDyKNgjj3-qvZcqTNApY7tSuzauAPZ4YM8';
  const src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;

  try {
    await loadScript(src);
    return true;
  } catch (error) {
    console.error('Error loading Google Maps script:', error);
    return false;
  }
};
