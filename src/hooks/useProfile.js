import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';

function mapSessionToProfile(user) {
  if (!user) return null;

  let fechaCreacion = '';
  if (user.createdAt) {
    try {
      fechaCreacion = new Date(user.createdAt).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      fechaCreacion = user.createdAt;
    }
  }

  return {
    nombre: user.full_name || user.name || '',
    correo: user.email || '',
    telefono: user.phone || '',
    direccion: user.address || '',
    ciudad: user.city || '',
    numeroCliente: user.client_number || '',
    avatar_url: user.avatar_url || '',
    fechaCreacion,
  };
}

export function useProfile() {
  const queryClient = useQueryClient();
  const { auth } = useAuth();

  const profile = mapSessionToProfile(auth?.user);

  const mutation = useMutation({
    mutationFn: (data) => {
      const updated = { ...profile, ...data };
      return Promise.resolve(updated);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['profile'], data);
    },
  });

  return {
    data: profile,
    isLoading: false,
    error: null,
    mutation,
  };
}
