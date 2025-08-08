
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface UploadResult {
  publicUrl: string;
  path: string;
}

export const useAvatarUpload = () => {
  const [uploading, setUploading] = useState(false);

  const uploadAvatar = async (userId: string, file: File): Promise<UploadResult> => {
    console.log('[useAvatarUpload] Starting upload...', { userId, fileName: file.name, fileType: file.type });
    setUploading(true);

    const ext = (file.name.split('.').pop() || 'png').toLowerCase();
    const safeExt = ext.replace(/[^a-z0-9]/gi, '') || 'png';
    const fileName = `${Date.now()}.${safeExt}`;
    const path = `${userId}/${fileName}`;

    const { error: uploadError } = await supabase
      .storage
      .from('avatars')
      .upload(path, file, {
        upsert: true,
        contentType: file.type || 'image/png',
      });

    if (uploadError) {
      console.error('[useAvatarUpload] Upload error:', uploadError);
      setUploading(false);
      throw uploadError;
    }

    const { data: publicData } = supabase
      .storage
      .from('avatars')
      .getPublicUrl(path);

    console.log('[useAvatarUpload] Upload complete. Public URL:', publicData.publicUrl);

    setUploading(false);
    return { publicUrl: publicData.publicUrl, path };
  };

  return { uploadAvatar, uploading };
};
