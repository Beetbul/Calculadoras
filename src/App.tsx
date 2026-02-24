import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { Database, CheckCircle2, XCircle, Loader2, Sparkles } from 'lucide-react';
// import './App.css';


function App() {
  const [status, setStatus] = useState<'loading' | 'connected' | 'error'>('loading');
  const [message, setMessage] = useState('Verificando conexión con Supabase...');

  useEffect(() => {
    async function checkConnection() {
      try {
        const { error } = await supabase.auth.getSession();

        if (error) {
          console.error('Connection error:', error);
          setStatus('error');
          setMessage('Error al conectar: ' + (error.message || 'Credenciales inválidas'));
        } else {
          setStatus('connected');
          setMessage('¡Conexión establecida correctamente!');
        }
      } catch (err) {
        console.error('Connection check failed:', err);
        setStatus('error');
        setMessage('Error de red al intentar conectar.');
      }
    }

    checkConnection();
  }, []);

  return (
    <div className="glass-card">
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)',
          padding: '1rem',
          borderRadius: '20px',
          boxShadow: '0 10px 20px -5px rgba(59, 130, 246, 0.5)'
        }}>
          <Database size={48} color="white" />
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <div className={`status-badge ${status}`}>
          {status === 'loading' && <Loader2 size={16} className="animate-spin" />}
          {status === 'connected' && <div className="pulse" />}
          {status === 'error' && <XCircle size={16} />}
          {status === 'loading' && 'Conectando'}
          {status === 'connected' && 'Conectado'}
          {status === 'error' && 'Error'}
        </div>

        <h1>Calculadoras</h1>
        <p>
          {message}
          <br />
          <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>
            Proyecto ID: qobqjuxefabvpuvvxcxs
          </span>
        </p>

        {status === 'connected' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              background: 'rgba(16, 185, 129, 0.1)',
              padding: '1rem',
              borderRadius: '12px',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              fontSize: '0.9rem',
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <CheckCircle2 size={20} />
              <span>Supabase está listo para usarse.</span>
            </div>

            <button className="btn">
              <Sparkles size={18} />
              Comenzar a Construir
            </button>
          </div>
        ) : status === 'error' ? (
          <button className="btn" style={{ background: '#ef4444' }} onClick={() => window.location.reload()}>
            Reintentar Conexión
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default App;
