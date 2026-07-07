import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { useTransfer } from '../../hooks/useTransfer';
import { useToast } from '../../hooks/useToast';
import { api } from '../../services/api';

const INITIAL = { cuentaDestino: '', monto: '', descripcion: '' };

export default function Transfer() {
  const { showToast } = useToast();
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [summary, setSummary] = useState(null);

  const { data: dashboard } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => api.getDashboard(),
  });

  const transfer = useTransfer();

  const saldo = dashboard?.saldo ?? 0;

  function validate() {
    const errs = {};
    if (!form.cuentaDestino.trim()) {
      errs.cuentaDestino = 'La cuenta destino es obligatoria';
    }
    const monto = parseFloat(form.monto);
    if (!monto || monto < 1) {
      errs.monto = 'El monto mínimo es $1';
    } else if (monto > saldo) {
      errs.monto = 'El monto no puede superar el saldo disponible';
    }
    if (!form.descripcion.trim()) {
      errs.descripcion = 'La descripción es obligatoria';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  }

  function handleContinue(e) {
    e.preventDefault();
    if (validate()) {
      setShowConfirm(true);
    }
  }

  async function handleConfirm() {
    setShowConfirm(false);
    try {
      const result = await transfer.mutateAsync({
        cuentaDestino: form.cuentaDestino,
        monto: parseFloat(form.monto),
        descripcion: form.descripcion,
      });
      showToast('Transferencia realizada con éxito');
      setSummary({
        destino: form.cuentaDestino,
        monto: parseFloat(form.monto),
        descripcion: form.descripcion,
        ...result,
      });
      setForm(INITIAL);
    } catch {
      showToast('Error al realizar la transferencia', 'error');
    }
  }

  function handleNewTransfer() {
    setSummary(null);
    setErrors({});
  }

  if (summary) {
    return (
      <div className="max-w-lg mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-[#1E3A8A]">Transferencia exitosa</h2>
        <Card>
          <Card.Header>Resumen</Card.Header>
          <Card.Body className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Cuenta destino</p>
              <p className="font-semibold text-gray-800">{summary.destino}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Monto</p>
              <p className="font-semibold text-[#16A34A]">${summary.monto.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Descripción</p>
              <p className="text-gray-700">{summary.descripcion}</p>
            </div>
          </Card.Body>
          <Card.Footer>
            <Button variant="primary" onClick={handleNewTransfer}>
              Nueva transferencia
            </Button>
          </Card.Footer>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-[#1E3A8A]">Transferencia</h2>

      <Card>
        <Card.Body>
          <div className="mb-4 p-3 bg-[#F8FAFC] rounded-lg border border-gray-100">
            <p className="text-sm text-gray-500">Cuenta origen</p>
            <p className="font-semibold text-gray-800">Cuenta principal</p>
            <p className="text-lg font-bold text-[#1E3A8A]">${saldo.toLocaleString()}</p>
          </div>

          <form onSubmit={handleContinue} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Cuenta destino
              </label>
              <input
                name="cuentaDestino"
                value={form.cuentaDestino}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] ${
                  errors.cuentaDestino ? 'border-[#DC2626]' : 'border-gray-200'
                }`}
                placeholder="Número de cuenta"
              />
              {errors.cuentaDestino && (
                <p className="text-xs text-[#DC2626] mt-1">{errors.cuentaDestino}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Monto</label>
              <input
                name="monto"
                type="number"
                step="0.01"
                min="1"
                value={form.monto}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] ${
                  errors.monto ? 'border-[#DC2626]' : 'border-gray-200'
                }`}
                placeholder="0.00"
              />
              {errors.monto && (
                <p className="text-xs text-[#DC2626] mt-1">{errors.monto}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Descripción
              </label>
              <input
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] ${
                  errors.descripcion ? 'border-[#DC2626]' : 'border-gray-200'
                }`}
                placeholder="Motivo de la transferencia"
              />
              {errors.descripcion && (
                <p className="text-xs text-[#DC2626] mt-1">{errors.descripcion}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              loading={transfer.isPending}
            >
              Continuar
            </Button>
          </form>
        </Card.Body>
      </Card>

      <Modal isOpen={showConfirm} onClose={() => setShowConfirm(false)}>
        <Modal.Header>Confirmar transferencia</Modal.Header>
        <Modal.Content>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Cuenta origen</p>
              <p className="font-semibold text-gray-800">Cuenta principal</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Cuenta destino</p>
              <p className="font-semibold text-gray-800">{form.cuentaDestino}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Monto</p>
              <p className="font-semibold text-[#DC2626]">
                -${parseFloat(form.monto).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Descripción</p>
              <p className="text-gray-700">{form.descripcion}</p>
            </div>
          </div>
        </Modal.Content>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirm} loading={transfer.isPending}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
