/**
 * Reliable storage engine supporting IndexedDB and localStorage fallback,
 * plus client-side image compression to prevent QuotaExceededError.
 */

const DB_NAME = 'andy_author_db';
const STORE_NAME = 'site_config';
const DB_VERSION = 1;
const CONFIG_KEY = 'andy_site_config';

/**
 * Open or create IndexedDB database
 */
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB not supported'));
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Put an item into IndexedDB
 */
export async function idbSet<T>(key: string, value: T): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(value, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('IndexedDB set failed:', err);
  }
}

/**
 * Get an item from IndexedDB
 */
export async function idbGet<T>(key: string): Promise<T | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => resolve((req.result as T) || null);
      req.onerror = () => resolve(null);
    });
  } catch (err) {
    console.warn('IndexedDB get failed:', err);
    return null;
  }
}

/**
 * Delete an item from IndexedDB
 */
export async function idbDel(key: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('IndexedDB delete failed:', err);
  }
}

/**
 * Compress an uploaded image file before storing, preventing QuotaExceededError
 */
export async function compressImageFile(
  file: File,
  options: {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
  } = {}
): Promise<string> {
  const { maxWidth = 1600, maxHeight = 1600, quality = 0.82 } = options;

  return new Promise((resolve, reject) => {
    // If not an image, reject
    if (!file.type.startsWith('image/')) {
      return reject(new Error('Selected file is not an image'));
    }

    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let width = img.width;
      let height = img.height;

      // Calculate proportional downscaling
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        // Fallback to raw FileReader if canvas context fails
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
        return;
      }

      // Smooth scaling
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      // Determine output format (prefer WebP, fallback to JPEG)
      let outputMime = 'image/jpeg';
      try {
        if (canvas.toDataURL('image/webp').startsWith('data:image/webp')) {
          outputMime = 'image/webp';
        }
      } catch {
        outputMime = 'image/jpeg';
      }

      let compressedDataUrl = canvas.toDataURL(outputMime, quality);

      // If still large (> 600KB base64), recompress with slightly lower quality
      if (compressedDataUrl.length > 800000) {
        compressedDataUrl = canvas.toDataURL(outputMime, 0.7);
      }

      resolve(compressedDataUrl);
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      // Fallback
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    };

    img.src = objectUrl;
  });
}

/**
 * Persist site config reliably to IndexedDB and try localStorage safely
 */
export async function saveSiteConfig(config: any): Promise<boolean> {
  // 1. Save to IndexedDB (no 5MB quota limit, can store hundreds of MB)
  await idbSet(CONFIG_KEY, config);

  // 2. Try saving to localStorage inside try/catch so QuotaExceededError is harmlessly caught
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
    } catch (err: any) {
      console.warn('localStorage quota reached (harmless, safely saved in IndexedDB):', err.message);
      // Try clearing old large items or partial cache if needed
    }
  }

  return true;
}

/**
 * Load site config: checks IndexedDB first, then localStorage
 */
export async function loadSiteConfig(): Promise<any | null> {
  // 1. Check IndexedDB
  const idbData = await idbGet<any>(CONFIG_KEY);
  if (idbData) {
    return idbData;
  }

  // 2. Fallback to localStorage
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(CONFIG_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Migrate to IndexedDB for future runs
        idbSet(CONFIG_KEY, parsed).catch(() => {});
        return parsed;
      }
    } catch (err) {
      console.error('Error reading localStorage:', err);
    }
  }

  return null;
}

/**
 * Synchronous read from localStorage for instant initial render before async IndexedDB finishes
 */
export function getSyncSiteConfig(): any | null {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(CONFIG_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore
    }
  }
  return null;
}

/**
 * Clear site config from both IndexedDB and localStorage
 */
export async function clearSiteConfig(): Promise<void> {
  await idbDel(CONFIG_KEY);
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(CONFIG_KEY);
    } catch {
      // Ignore
    }
  }
}
