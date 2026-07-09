import { useState, useRef, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Avatar from '../components/ui/Avatar';
import Alert from '../components/ui/Alert';
import Spinner from '../components/ui/Spinner';
import { useProfile } from '../hooks/useProfile';

const NAME_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
const PHONE_REGEX = /^\d{7,15}$/;

function validateForm(profile, changes) {
  const { nombre, telefono, direccion, ciudad } = { ...profile, ...changes };
  const errors = {};

  if (!nombre.trim()) {
    errors.nombre = 'El nombre es obligatorio';
  } else if (nombre.trim().length < 3) {
    errors.nombre = 'Mínimo 3 caracteres';
  } else if (nombre.trim().length > 100) {
    errors.nombre = 'Máximo 100 caracteres';
  } else if (!NAME_REGEX.test(nombre)) {
    errors.nombre = 'No se permiten caracteres especiales';
  }

  if (telefono.trim()) {
    if (!PHONE_REGEX.test(telefono.trim())) {
      errors.telefono = 'Debe tener entre 7 y 15 dígitos';
    }
  }

  if (!direccion.trim()) {
    errors.direccion = 'La dirección es obligatoria';
  } else if (direccion.trim().length > 150) {
    errors.direccion = 'Máximo 150 caracteres';
  }

  if (!ciudad.trim()) {
    errors.ciudad = 'La ciudad es obligatoria';
  }

  return errors;
}

export default function Profile() {
  const { data: profile, isLoading, error, mutation } = useProfile();
  const fileInputRef = useRef(null);
  const [changes, setChanges] = useState({});
  const [errors, setErrors] = useState({});
  const [avatarSrc, setAvatarSrc] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => setSuccessMsg(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMsg]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <Alert>Error al cargar el perfil</Alert>
      </div>
    );
  }

  if (!profile) return null;

  const form = { ...profile, ...changes };

  const hasChanges = Object.keys(changes).length > 0;

  const handleChange = (field) => (e) => {
    setChanges((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarSrc(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');

    const validation = validateForm(profile, changes);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    try {
      await mutation.mutateAsync(changes);
      setChanges({});
      setSuccessMsg('Cambios guardados correctamente.');
    } catch {
      setErrors({ _api: 'Error al guardar los cambios.' });
    }
  };

  const handleCancel = () => {
    setChanges({});
    setErrors({});
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1E3A8A]">Mi Perfil</h1>
        <p className="text-sm text-gray-500 mt-1">
          Consulta y actualiza tu información personal.
        </p>
      </div>

      {successMsg && <Alert variant="success">{successMsg}</Alert>}
      {errors._api && <Alert>{errors._api}</Alert>}

      <Card>
        <Card.Body>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <button type="button" onClick={handleAvatarClick} className="focus:outline-none focus:ring-2 focus:ring-[#2563EB] rounded-full">
              <Avatar name={profile.nombre} src={avatarSrc || profile.avatar_url} size="lg" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              aria-label="Cambiar foto de perfil"
            />
            <div className="text-center sm:text-left">
              <p className="text-lg font-bold text-gray-800">{profile.nombre}</p>
              <p className="text-sm text-gray-500">{profile.correo}</p>
              <p className="text-xs text-gray-400 mt-1">
                Cliente: {profile.numeroCliente}
              </p>
              <p className="text-xs text-gray-400">
                Cuenta creada el {profile.fechaCreacion}
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>Información personal</Card.Header>
        <Card.Body>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Nombre completo"
                name="nombre"
                placeholder="Juan Pérez"
                aria-label="Nombre completo"
                value={form.nombre}
                onChange={handleChange('nombre')}
                error={errors.nombre}
              />

              <Input
                label="Correo electrónico"
                name="correo"
                type="email"
                placeholder="juan@email.com"
                aria-label="Correo electrónico"
                value={form.correo}
                disabled
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Teléfono"
                name="telefono"
                type="tel"
                placeholder="5551234567"
                aria-label="Teléfono"
                value={form.telefono}
                onChange={handleChange('telefono')}
                error={errors.telefono}
              />

              <Input
                label="Ciudad"
                name="ciudad"
                placeholder="Ciudad de México"
                aria-label="Ciudad"
                value={form.ciudad}
                onChange={handleChange('ciudad')}
                error={errors.ciudad}
              />
            </div>

            <Input
              label="Dirección"
              name="direccion"
              placeholder="Av. Principal 123"
              aria-label="Dirección"
              value={form.direccion}
              onChange={handleChange('direccion')}
              error={errors.direccion}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Número de cliente"
                name="numeroCliente"
                aria-label="Número de cliente"
                value={form.numeroCliente}
                disabled
              />

              <Input
                label="Fecha de creación"
                name="fechaCreacion"
                aria-label="Fecha de creación"
                value={form.fechaCreacion}
                disabled
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit" variant="primary" disabled={!hasChanges} loading={mutation.isPending}>
                Guardar cambios
              </Button>
              <Button type="button" variant="secondary" disabled={!hasChanges} onClick={handleCancel}>
                Cancelar cambios
              </Button>
            </div>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}
