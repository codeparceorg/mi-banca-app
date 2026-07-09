import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Alert from '../components/ui/Alert';
import Spinner from '../components/ui/Spinner';
import { api } from '../services/api';
import { saveUser } from '../services/users';
import { useAuth } from '../context/AuthContext';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Step1({ onComplete, onError }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const clearFieldError = (field) => {
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    onError('');

    const errs = {};
    if (!email.trim()) {
      errs.email = 'El correo es obligatorio';
    } else if (!EMAIL_REGEX.test(email)) {
      errs.email = 'Formato de correo inválido';
    }
    if (!password) {
      errs.password = 'La contraseña es obligatoria';
    } else if (password.length < 8) {
      errs.password = 'Mínimo 8 caracteres';
    }

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    try {
      const data = await api.signup(email.trim(), password);
      onComplete({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        IdAuthToken: data.id_auth_token,
        email: email.trim(),
      });
    } catch (err) {
      onError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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
      <Button type="submit" variant="primary" className="w-full flex items-center justify-center gap-2" disabled={loading}>
        {loading && <Spinner />}
        {loading ? 'Creando cuenta...' : 'Continuar'}
      </Button>
    </form>
  );
}

function Step2({ email, idAuthToken, tokens, onError }) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const clearFieldError = (field) => {
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    onError('');

    const errs = {};
    if (!fullName.trim()) errs.fullName = 'El nombre es obligatorio';
    if (!city.trim()) errs.city = 'La ciudad es obligatoria';

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    try {
      const user = await saveUser({
        full_name: fullName.trim(),
        email,
        auth_token_id: idAuthToken,
        phone: phone.trim(),
        address: address.trim(),
        city: city.trim(),
      });
      login(tokens.accessToken, tokens.refreshToken, user);
      navigate('/dashboard');
    } catch (err) {
      onError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <Input
        label="Correo electrónico"
        name="email"
        type="email"
        value={email}
        readOnly
        className="bg-gray-50 text-gray-500 cursor-not-allowed"
      />
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
        label="Teléfono"
        name="phone"
        type="tel"
        placeholder="3001234567"
        aria-label="Teléfono"
        value={phone}
        onChange={(e) => { setPhone(e.target.value); clearFieldError('phone'); }}
      />
      <Input
        label="Dirección"
        name="address"
        type="text"
        placeholder="Calle 10 #20-30"
        aria-label="Dirección"
        value={address}
        onChange={(e) => { setAddress(e.target.value); clearFieldError('address'); }}
      />
      <Input
        label="Ciudad"
        name="city"
        type="text"
        placeholder="Bogotá"
        aria-label="Ciudad"
        value={city}
        onChange={(e) => { setCity(e.target.value); clearFieldError('city'); }}
        error={errors.city}
      />

      <Button type="submit" variant="primary" className="w-full flex items-center justify-center gap-2" disabled={loading}>
        {loading && <Spinner />}
        {loading ? 'Guardando...' : 'Guardar información'}
      </Button>
    </form>
  );
}

export default function Signup() {
  const [step, setStep] = useState(1);
  const [wizardData, setWizardData] = useState(null);
  const [apiError, setApiError] = useState('');

  const handleStep1Complete = (data) => {
    setWizardData(data);
    setStep(2);
    setApiError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4 py-8">
      <Card className="w-full max-w-sm">
        <Card.Body className="space-y-6">
          <div className="text-center space-y-2">
            <div className="text-4xl">🏦</div>
            <h1 className="text-2xl font-bold text-[#1E3A8A]">
              {step === 1 ? 'Crear cuenta' : 'Completa tu información'}
            </h1>
          </div>

          <p className="text-center text-sm text-gray-500">Paso {step} de 2</p>

          {apiError && <Alert>{apiError}</Alert>}

          {step === 1 ? (
            <Step1 onComplete={handleStep1Complete} onError={setApiError} />
          ) : (
            <Step2
              email={wizardData.email}
              idAuthToken={wizardData.IdAuthToken}
              tokens={{ accessToken: wizardData.accessToken, refreshToken: wizardData.refreshToken }}
              onError={setApiError}
            />
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
