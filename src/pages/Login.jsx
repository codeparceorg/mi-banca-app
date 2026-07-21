import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Alert from '../components/ui/Alert';
import Spinner from '../components/ui/Spinner';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(email, password) {
  const errors = {};
  if (!email.trim()) {
    errors.email = 'El correo es obligatorio';
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Formato de correo inválido';
  }
  if (!password) {
    errors.password = 'La contraseña es obligatoria';
  } else if (password.length < 8) {
    errors.password = 'Mínimo 8 caracteres';
  }
  return errors;
}

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    const validation = validate(email, password);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setLoading(true);
    try {
      const data = await api.login(email, password);
      login(data.accessToken, data.refreshToken, data.user);
      navigate('/dashboard');
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <h2 className='caret-amber-50 text-amber-50'>mi prueba</h2>
      <Card className="w-full max-w-sm">
        <Card.Body className="space-y-6">
          <div className="text-center space-y-2">
            <div className="text-4xl">🏦</div>
            <h1 className="text-2xl font-bold text-[#1E3A8A]">Iniciar sesión</h1>
          </div>

          {apiError && <Alert>{apiError}</Alert>}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="cliente@correo.com"
              aria-label="Correo electrónico"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: '' })); }}
              error={errors.email}
            />

            <Input
              label="Contraseña"
              name="password"
              type="password"
              placeholder="••••••••"
              aria-label="Contraseña"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: '' })); }}
              error={errors.password}
            />

            <Button type="submit" variant="primary" className="w-full flex items-center justify-center gap-2" disabled={loading}>
              {loading && <Spinner />}
              {loading ? 'Ingresando...' : 'Ingresar'}
            </Button>
          </form>

          <div className="text-center space-y-2">
            <Link
              to="#"
              className="block text-sm text-[#2563EB] hover:underline"
              onClick={(e) => e.preventDefault()}
              tabIndex={0}
              aria-label="¿Olvidaste tu contraseña?"
            >
              ¿Olvidaste tu contraseña?
            </Link>
            <p className="text-sm text-gray-500">
              ¿No tienes cuenta?{' '}
              <Link to="/signup" className="text-[#2563EB] hover:underline font-semibold">
                Regístrate
              </Link>
            </p>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
