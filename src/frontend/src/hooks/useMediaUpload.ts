import { useCallback } from 'react';
import { useActor } from './useActor';
import { ExternalBlob } from '../backend';
import type { Photo } from '../backend';
import { toast } from 'sonner';
import { useInvalidateMedia } from './useQueries';

export function useMediaUpload() {
  const { actor } = useActor();
  const { invalidatePhotos } = useInvalidateMedia();

  const handlePhotoUpload = useCallback(
    async (file: File, description: string, onProgress?: (percentage: number) => void) => {
      if (!actor) {
        toast.error('Backend not initialized');
        return;
      }

      try {
        const arrayBuffer = await file.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);

        const blob = onProgress 
          ? ExternalBlob.fromBytes(bytes).withUploadProgress(onProgress)
          : ExternalBlob.fromBytes(bytes);

        const id = `photo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        const photoData: Photo = {
          id,
          description,
          image: blob,
        };

        await actor.addPhoto(photoData);

        // Invalidate queries to refetch all photos
        await invalidatePhotos();

        toast.success('Photo uploaded successfully!');
        return true;
      } catch (error) {
        console.error('Error uploading photo:', error);
        toast.error('Failed to upload photo');
        return false;
      }
    },
    [actor, invalidatePhotos]
  );

  return {
    handlePhotoUpload,
  };
}
