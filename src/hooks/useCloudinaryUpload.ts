import { useState } from 'react';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:54321/functions/v1';

export function useCloudinaryUpload() {
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (file: File, filename?: string): Promise<string | null> => {
    // Validate file type - only JPG allowed
    if (!file.type.includes('jpeg') && !file.type.includes('jpg')) {
      toast.error('Only JPG/JPEG images are allowed');
      return null;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return null;
    }

    setUploading(true);

    try {
      // Convert file to base64
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const sanitizedFilename = filename 
        ? filename.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')
        : `image-${Date.now()}`;

      const response = await fetch(`${API_BASE_URL}/cloudinary-upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'upload',
          image: base64,
          filename: sanitizedFilename,
        }),
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.success) throw new Error(data.error);

      toast.success('Image uploaded successfully');
      return data.url;
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Failed to upload image');
      return null;
    } finally {
      setUploading(false);
    }
  };

  return { uploadImage, uploading };
}
