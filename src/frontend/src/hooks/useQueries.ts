import { useQuery } from '@tanstack/react-query';
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
