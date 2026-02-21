import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Photo } from '../backend';

export function useGetPhoto(id: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Photo | null>({
    queryKey: ['photo', id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getPhoto(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useGetAllPhotos() {
  const { actor, isFetching } = useActor();

  return useQuery<Photo[]>({
    queryKey: ['photos'],
    queryFn: async () => {
      if (!actor) {
        return [];
      }
      const photos = await actor.getAllPhotos();
      return photos;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useInvalidateMedia() {
  const queryClient = useQueryClient();

  return {
    invalidatePhotos: () => {
      return queryClient.invalidateQueries({ queryKey: ['photos'] });
    },
  };
}
