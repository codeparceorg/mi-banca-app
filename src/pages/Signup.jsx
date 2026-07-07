import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Checkbox from '../components/ui/Checkbox';
import Alert from '../components/ui/Alert';
import Spinner from '../components/ui/Spinner';
import { api } from '../services/api';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;

function validate(fullName, email, password, confirmPassword, acceptedTerms) {
  const errors = {};

  if (!fullName.trim()) {
    errors.fullName = 'El nombre es obligatorio';
  } else if (fullName.trim().length < 3) {
    errors.fullName = 'Mínimo 3 caracteres';
  } else if (fullName.trim().length > 100) {
    errors.fullName = 'Máximo 100 caracteres';
  }

  if (!email.trim()) {
    errors.email = 'El correo es obligatorio';
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Formato de correo inválido';
  }

  if (!password) {
    errors.password = 'La contraseña es obligatoria';
  } else if (password.length < 8) {
    errors.password = 'Mínimo 8 caracteres';
  } else if (!PASSWORD_REGEX.test(password)) {
    errors.password = 'Debe incluir mayúscula, minúscula y número';
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Confirma tu contraseña';
  } else if (password && confirmPassword !== password) {
    errors.confirmPassword = 'Las contraseñas no coinciden';
  }

  if (!acceptedTerms) {
    errors.acceptedTerms = 'Debes aceptar los términos y condiciones';
  }

  return errors;
}

export default function Signup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => navigate('/login'), 2000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const clearFieldError = (field) => {
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    const validation = validate(fullName, email, password, confirmPassword, acceptedTerms);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setLoading(true);
    try {
      await api.signup(fullName.trim(), email.trim(), password);
      setSuccess('Usuario registrado correctamente.');
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4 py-8">
      <Card className="w-full max-w-sm">
        <Card.Body className="space-y-6">
          <div className="text-center space-y-2">
            <div className="text-4xl">🏦</div>
            <h1 className="text-2xl font-bold text-[#1E3A8A]">Crear cuenta</h1>
          </div>

          {apiError && <Alert>{apiError}</Alert>}
          {success && <Alert variant="success">{success} Redirigiendo al inicio de sesión...</Alert>}

          {!success && (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <Input
                label="Nombre completo"
                name="fullName"
                type="text"
                placeholder="Juan Pérez"
                aria-label="Nombre completo"
                value={fullName}
                onChange={(e) => { setFullName(e.target.value); clearFieldError('fullName'); }}
                error={errors.fullName}
              />

              <Input
                label="Correo electrónico"
                name="email"
                type="email"
                placeholder="juan@email.com"
                aria-label="Correo electrónico"
                value={email}
                onChange={(e) => { setEmail(e.target.value); clearFieldError('email'); }}
                error={errors.email}
              />

              <Input
                label="Contraseña"
                name="password"
                type="password"
                placeholder="••••••••"
                aria-label="Contraseña"
                value={password}
                onChange={(e) => { setPassword(e.target.value); clearFieldError('password'); }}
                error={errors.password}
              />

              <Input
                label="Confirmar contraseña"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                aria-label="Confirmar contraseña"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); clearFieldError('confirmPassword'); }}
                error={errors.confirmPassword}
              />

              <Checkbox
                name="acceptedTerms"
                label="Acepto los términos y condiciones"
                checked={acceptedTerms}
                onChange={() => { setAcceptedTerms(!acceptedTerms); clearFieldError('acceptedTerms'); }}
                error={errors.acceptedTerms}
              />

              <Button type="submit" variant="primary" className="w-full flex items-center justify-center gap-2" disabled={loading}>
                {loading && <Spinner />}
                {loading ? 'Creando cuenta...' : 'Crear cuenta'}
              </Button>
            </form>
          )}

          <p className="text-center text-sm text-gray-500">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="text-[#2563EB] hover:underline font-semibold">
              Iniciar sesión
            </Link>
          </p>
        </Card.Body>
      </Card>
    </div>
  );
}
