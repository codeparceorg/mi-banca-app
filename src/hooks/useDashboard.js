import { useQuery } from '@tanstack/react-query';
import { dashboardMock } from '../mock/dashboard/dashboard.mock';

export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: () => dashboardMock,
  });
}
