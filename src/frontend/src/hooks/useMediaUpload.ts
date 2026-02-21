import { useState, useCallback } from 'react';
import { useActor } from './useActor';
import { ExternalBlob } from '../backend';
import type { PhotoData, CertificateData } from '../backend';
import { toast } from 'sonner';

interface PhotoDisplay {
  id: string;
  description: string;
  imageUrl: string;
}

interface CertificateDisplay {
  id: string;
  title: string;
  fileUrl: string;
}

export function useMediaUpload() {
  const { actor } = useActor();
  const [photos, setPhotos] = useState<PhotoDisplay[]>([]);
  const [certificates, setCertificates] = useState<CertificateDisplay[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handlePhotoUpload = useCallback(
    async (file: File, description: string) => {
      if (!actor) {
        toast.error('Backend not initialized');
        return;
      }

      try {
        setIsUploading(true);
        setUploadProgress(0);

        const arrayBuffer = await file.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);

        const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((percentage) => {
          setUploadProgress(percentage);
        });

        const id = `photo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        const photoData: PhotoData = {
          id,
          description,
          image: blob,
        };

        await actor.addPhoto(photoData);

        const imageUrl = blob.getDirectURL();
        setPhotos((prev) => [...prev, { id, description, imageUrl }]);

        toast.success('Photo uploaded successfully!');
      } catch (error) {
        console.error('Error uploading photo:', error);
        toast.error('Failed to upload photo');
      } finally {
        setIsUploading(false);
        setUploadProgress(0);
      }
    },
    [actor]
  );

  const handleCertificateUpload = useCallback(
    async (file: File, title: string) => {
      if (!actor) {
        toast.error('Backend not initialized');
        return;
      }

      try {
        setIsUploading(true);
        setUploadProgress(0);

        const arrayBuffer = await file.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);

        const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((percentage) => {
          setUploadProgress(percentage);
        });

        const id = `cert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        const certData: CertificateData = {
          id,
          title,
          file: blob,
        };

        await actor.addCertificate(certData);

        const fileUrl = blob.getDirectURL();
        setCertificates((prev) => [...prev, { id, title, fileUrl }]);

        toast.success('Certificate uploaded successfully!');
      } catch (error) {
        console.error('Error uploading certificate:', error);
        toast.error('Failed to upload certificate');
      } finally {
        setIsUploading(false);
        setUploadProgress(0);
      }
    },
    [actor]
  );

  return {
    photos,
    certificates,
    uploadProgress,
    isUploading,
    handlePhotoUpload,
    handleCertificateUpload,
  };
}
