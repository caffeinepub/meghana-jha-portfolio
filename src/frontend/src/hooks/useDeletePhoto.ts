import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useDeletePhoto() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (photoId: string) => {
      if (!actor) {
        throw new Error('Backend not initialized');
      }
      await actor.deletePhoto(photoId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['photos'] });
    },
  });
}
