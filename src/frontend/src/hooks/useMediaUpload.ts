import { useCallback } from 'react';
import { useActor } from './useActor';
import { ExternalBlob } from '../backend';
import type { PhotoData, CertificateData } from '../backend';
import { toast } from 'sonner';
import { useInvalidateMedia } from './useQueries';

export function useMediaUpload() {
  const { actor } = useActor();
  const { invalidatePhotos, invalidateCertificates } = useInvalidateMedia();

  const handlePhotoUpload = useCallback(
    async (file: File, description: string, onProgress?: (percentage: number) => void) => {
      if (!actor) {
        toast.error('Backend not initialized');
        return;
      }

      try {
        console.log('[handlePhotoUpload] Starting upload:', {
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
          description
        });

        const arrayBuffer = await file.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);
        console.log('[handlePhotoUpload] File converted to bytes:', bytes.length);

        const blob = onProgress 
          ? ExternalBlob.fromBytes(bytes).withUploadProgress(onProgress)
          : ExternalBlob.fromBytes(bytes);

        console.log('[handlePhotoUpload] ExternalBlob created:', {
          blobType: typeof blob,
          hasGetDirectURL: typeof blob.getDirectURL === 'function'
        });

        const id = `photo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        const photoData: PhotoData = {
          id,
          description,
          image: blob,
        };

        console.log('[handlePhotoUpload] Calling backend addPhoto with:', {
          id,
          description,
          hasImage: !!photoData.image
        });

        await actor.addPhoto(photoData);

        console.log('[handlePhotoUpload] Photo added successfully, invalidating cache');

        // Invalidate queries to refetch all photos
        await invalidatePhotos();

        toast.success('Photo uploaded successfully!');
        return true;
      } catch (error) {
        console.error('[handlePhotoUpload] Error uploading photo:', error);
        toast.error('Failed to upload photo');
        return false;
      }
    },
    [actor, invalidatePhotos]
  );

  const handleCertificateUpload = useCallback(
    async (file: File, title: string, onProgress?: (percentage: number) => void) => {
      if (!actor) {
        toast.error('Backend not initialized');
        return;
      }

      try {
        console.log('[handleCertificateUpload] Starting upload:', {
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
          title
        });

        const arrayBuffer = await file.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);
        console.log('[handleCertificateUpload] File converted to bytes:', bytes.length);

        const blob = onProgress
          ? ExternalBlob.fromBytes(bytes).withUploadProgress(onProgress)
          : ExternalBlob.fromBytes(bytes);

        console.log('[handleCertificateUpload] ExternalBlob created:', {
          blobType: typeof blob,
          hasGetDirectURL: typeof blob.getDirectURL === 'function'
        });

        const id = `cert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        const certData: CertificateData = {
          id,
          title,
          file: blob,
        };

        console.log('[handleCertificateUpload] Calling backend addCertificate with:', {
          id,
          title,
          hasFile: !!certData.file
        });

        await actor.addCertificate(certData);

        console.log('[handleCertificateUpload] Certificate added successfully, invalidating cache');

        // Invalidate queries to refetch all certificates
        await invalidateCertificates();

        toast.success('Certificate uploaded successfully!');
        return true;
      } catch (error) {
        console.error('[handleCertificateUpload] Error uploading certificate:', error);
        toast.error('Failed to upload certificate');
        return false;
      }
    },
    [actor, invalidateCertificates]
  );

  return {
    handlePhotoUpload,
    handleCertificateUpload,
  };
}
