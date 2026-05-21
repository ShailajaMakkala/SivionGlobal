export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  // Already a full URL (http/https)
  if (imagePath.startsWith('http')) return imagePath;
  // File object (for local preview before upload)
  if (imagePath instanceof File) return URL.createObjectURL(imagePath);

  // Relative path from backend like /uploads/portfolio/image-xxx.jpg
  const normalized = imagePath.replace(/\\/g, '/');
  const cleanPath = normalized.startsWith('/') ? normalized : '/' + normalized;

  // In development, return the relative path so that the Vite dev server proxy (defined in vite.config.js)
  // handles routing the image request to the active backend (whether local or remote).
  if (import.meta.env.DEV) {
    return cleanPath;
  }

  // In production (Vercel), resolve against the configured VITE_API_URL
  const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const baseUrl = apiBaseUrl.replace('/api', '');
  return baseUrl + cleanPath;
};
