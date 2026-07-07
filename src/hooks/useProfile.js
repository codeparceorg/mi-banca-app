import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileMock } from '../mock/profile/profile.mock';

export function useProfile() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['profile'],
    queryFn: () => profileMock,
  });

  const mutation = useMutation({
    mutationFn: (data) => {
      const updated = { ...profileMock, ...data };
      return Promise.resolve(updated);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['profile'], data);
    },
  });

  return { ...query, mutation };
}
