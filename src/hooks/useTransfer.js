import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';

export function useTransfer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => api.postTransfer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}
