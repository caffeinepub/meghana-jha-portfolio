import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { PhotoData, CertificateData } from '../backend';

export function useGetPhoto(id: string) {
  const { actor, isFetching } = useActor();

  return useQuery<PhotoData | null>({
    queryKey: ['photo', id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getPhoto(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useGetCertificate(id: string) {
  const { actor, isFetching } = useActor();

  return useQuery<CertificateData | null>({
    queryKey: ['certificate', id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCertificate(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useGetAllPhotos() {
  const { actor, isFetching } = useActor();

  return useQuery<PhotoData[]>({
    queryKey: ['photos'],
    queryFn: async () => {
      if (!actor) {
        console.log('[useGetAllPhotos] Actor not available');
        return [];
      }
      console.log('[useGetAllPhotos] Fetching all photos from backend...');
      const photos = await actor.getAllPhotos();
      console.log('[useGetAllPhotos] Fetched photos:', {
        count: photos.length,
        photos: photos.map(p => ({
          id: p.id,
          description: p.description,
          hasImage: !!p.image,
          imageType: typeof p.image,
          hasGetDirectURL: typeof p.image?.getDirectURL === 'function'
        }))
      });
      return photos;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllCertificates() {
  const { actor, isFetching } = useActor();

  return useQuery<CertificateData[]>({
    queryKey: ['certificates'],
    queryFn: async () => {
      if (!actor) {
        console.log('[useGetAllCertificates] Actor not available');
        return [];
      }
      console.log('[useGetAllCertificates] Fetching all certificates from backend...');
      const certificates = await actor.getAllCertificates();
      console.log('[useGetAllCertificates] Fetched certificates:', {
        count: certificates.length,
        certificates: certificates.map(c => ({
          id: c.id,
          title: c.title,
          hasFile: !!c.file,
          fileType: typeof c.file,
          hasGetDirectURL: typeof c.file?.getDirectURL === 'function'
        }))
      });
      return certificates;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useInvalidateMedia() {
  const queryClient = useQueryClient();

  return {
    invalidatePhotos: () => {
      console.log('[useInvalidateMedia] Invalidating photos query');
      return queryClient.invalidateQueries({ queryKey: ['photos'] });
    },
    invalidateCertificates: () => {
      console.log('[useInvalidateMedia] Invalidating certificates query');
      return queryClient.invalidateQueries({ queryKey: ['certificates'] });
    },
  };
}
