import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Webhook URLs
const WEBHOOKS = {
  telegram: 'https://n8n-railway.etiquetas.io/webhook/canal-telegram',
  viradaCafe: 'https://n8n-railway.etiquetas.io/webhook/virada-cafe',
  pratosAirtable: 'https://n8n-railway.etiquetas.io/webhook/pullman-ibira-pratos',
  logoPullman: 'https://n8n-railway.etiquetas.io/webhook/logo-pullman',
  logoBase: 'https://n8n-railway.etiquetas.io/webhook/logo-base',
  cargaImagensAlergenicos: 'https://n8n-railway.etiquetas.io/webhook/pullman-ibira-alergenicos',
  etiquetasLivre: 'https://n8n-railway.etiquetas.io/webhook/ibira-tudo-livre',
  statusConta: 'https://n8n-railway.etiquetas.io/webhook/status-conta',
  backupTemplates: 'https://n8n-railway.etiquetas.io/webhook/backup-templates'
};

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function App() {
  const [activeStates, setActiveStates] = useState<Record<string, { status: Status; message: string }>>({});

  const triggerWebhook = async (id: string, url: string) => {
    setActiveStates(prev => ({ ...prev, [id]: { status: 'loading', message: 'Processando...' } }));
    
    try {
      const response = await fetch(url, { method: 'GET' });

      if (response.ok) {
        setActiveStates(prev => ({ ...prev, [id]: { status: 'success', message: 'Ação realizada com sucesso!' } }));
        setTimeout(() => {
          setActiveStates(prev => ({ ...prev, [id]: { status: 'idle', message: '' } }));
        }, 3000);
      } else {
        throw new Error(`Erro: ${response.statusText}`);
      }
    } catch (error) {
      setActiveStates(prev => ({ ...prev, [id]: { status: 'error', message: error instanceof Error ? error.message : 'Erro' } }));
      setTimeout(() => {
        setActiveStates(prev => ({ ...prev, [id]: { status: 'idle', message: '' } }));
      }, 3000);
    }
  };

  const getButtonText = (id: string, defaultText: string) => {
    const state = activeStates[id];
    if (state?.status === 'loading') return 'PROCESSANDO...';
    if (state?.status === 'success') return 'SUCESSO!';
    if (state?.status === 'error') return 'ERRO!';
    return defaultText;
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', padding: '24px', paddingTop: '40px', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1a1a1a', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <div style={{ maxWidth: '448px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Header */}
        <header style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Pullman_logo_2013.svg/1280px-Pullman_logo_2013.svg.png" 
            alt="Pullman Logo" 
            style={{ height: '48px', width: 'auto', alignSelf: 'flex-start' }}
            referrerPolicy="no-referrer"
          />
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 600, letterSpacing: '-0.025em', textTransform: 'uppercase', margin: 0 }}>SINCRONIZAÇÃO DOS DADOS</h1>
            <p style={{ fontSize: '12px', color: '#9e9e9e', margin: '4px 0 0 0' }}>Sincroniza os dados do Airtable com o sistema das etiquetas eletrônicas by @etiquetas.io</p>
          </div>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', alignItems: 'flex-start' }}>
          <button
            onClick={() => triggerWebhook('telegram', WEBHOOKS.telegram)}
          disabled={activeStates['telegram']?.status === 'loading'}
          style={{ padding: '12px 24px', borderRadius: '4px', fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', border: 'none', cursor: activeStates['telegram']?.status === 'loading' ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap', opacity: activeStates['telegram']?.status === 'loading' ? 0.5 : 1, transition: 'opacity 0.2s', backgroundColor: '#FF00FF', color: 'white' }}
        >
          {getButtonText('telegram', 'CANAL DO TELEGRAM')}
        </button>

        <button
          onClick={() => triggerWebhook('viradaCafe', WEBHOOKS.viradaCafe)}
          disabled={activeStates['viradaCafe']?.status === 'loading'}
          style={{ padding: '12px 24px', borderRadius: '4px', fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', border: 'none', cursor: activeStates['viradaCafe']?.status === 'loading' ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap', opacity: activeStates['viradaCafe']?.status === 'loading' ? 0.5 : 1, transition: 'opacity 0.2s', backgroundColor: '#00B050', color: 'white' }}
        >
          {getButtonText('viradaCafe', 'VIRADA CAFÉ DA MANHÃ MANUAL')}
        </button>

        <button
          onClick={() => triggerWebhook('pratosAirtable', WEBHOOKS.pratosAirtable)}
          disabled={activeStates['pratosAirtable']?.status === 'loading'}
          style={{ padding: '12px 24px', borderRadius: '4px', fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', border: 'none', cursor: activeStates['pratosAirtable']?.status === 'loading' ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap', opacity: activeStates['pratosAirtable']?.status === 'loading' ? 0.5 : 1, transition: 'opacity 0.2s', backgroundColor: '#FFFF00', color: '#FF0000' }}
        >
          {getButtonText('pratosAirtable', 'PRATOS NO AIRTABLE')}
        </button>

        <button
          onClick={() => triggerWebhook('logoPullman', WEBHOOKS.logoPullman)}
          disabled={activeStates['logoPullman']?.status === 'loading'}
          style={{ padding: '12px 24px', borderRadius: '4px', fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', border: 'none', cursor: activeStates['logoPullman']?.status === 'loading' ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap', opacity: activeStates['logoPullman']?.status === 'loading' ? 0.5 : 1, transition: 'opacity 0.2s', backgroundColor: 'black', color: 'white' }}
        >
          {getButtonText('logoPullman', 'MUDAR LOGO PARA PULLMAN')}
        </button>

        <button
          onClick={() => triggerWebhook('logoBase', WEBHOOKS.logoBase)}
          disabled={activeStates['logoBase']?.status === 'loading'}
          style={{ padding: '12px 24px', borderRadius: '4px', fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', border: 'none', cursor: activeStates['logoBase']?.status === 'loading' ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap', opacity: activeStates['logoBase']?.status === 'loading' ? 0.5 : 1, transition: 'opacity 0.2s', backgroundColor: 'black', color: 'white' }}
        >
          {getButtonText('logoBase', 'MUDAR LOGO PARA BASE')}
        </button>

        <button
          onClick={() => triggerWebhook('cargaImagensAlergenicos', WEBHOOKS.cargaImagensAlergenicos)}
          disabled={activeStates['cargaImagensAlergenicos']?.status === 'loading'}
          style={{ padding: '12px 24px', borderRadius: '4px', fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', border: 'none', cursor: activeStates['cargaImagensAlergenicos']?.status === 'loading' ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap', opacity: activeStates['cargaImagensAlergenicos']?.status === 'loading' ? 0.5 : 1, transition: 'opacity 0.2s', backgroundColor: '#FF0000', color: 'white' }}
        >
          {getButtonText('cargaImagensAlergenicos', 'CARGA IMAGENS ALERGÊNICOS')}
        </button>

        <button
          onClick={() => triggerWebhook('etiquetasLivre', WEBHOOKS.etiquetasLivre)}
          disabled={activeStates['etiquetasLivre']?.status === 'loading'}
          style={{ padding: '12px 24px', borderRadius: '4px', fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', border: 'none', cursor: activeStates['etiquetasLivre']?.status === 'loading' ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap', opacity: activeStates['etiquetasLivre']?.status === 'loading' ? 0.5 : 1, transition: 'opacity 0.2s', backgroundColor: '#3B82F6', color: 'white' }}
        >
          {getButtonText('etiquetasLivre', 'COLOCAR ETIQUETAS EM LIVRE')}
        </button>

        <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => triggerWebhook('statusConta', WEBHOOKS.statusConta)}
            disabled={activeStates['statusConta']?.status === 'loading'}
            style={{ padding: '12px 24px', borderRadius: '4px', fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', border: 'none', cursor: activeStates['statusConta']?.status === 'loading' ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap', opacity: activeStates['statusConta']?.status === 'loading' ? 0.5 : 1, transition: 'opacity 0.2s', backgroundColor: '#ED7D31', color: 'white' }}
          >
            {getButtonText('statusConta', 'STATUS SUA CONTA')}
          </button>
          
          <button
            onClick={() => triggerWebhook('backupTemplates', WEBHOOKS.backupTemplates)}
            disabled={activeStates['backupTemplates']?.status === 'loading'}
            style={{ padding: '12px 24px', borderRadius: '4px', fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', border: 'none', cursor: activeStates['backupTemplates']?.status === 'loading' ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap', opacity: activeStates['backupTemplates']?.status === 'loading' ? 0.5 : 1, transition: 'opacity 0.2s', backgroundColor: '#ED7D31', color: 'white' }}
          >
            {getButtonText('backupTemplates', 'BACKUP TEMPLATES')}
          </button>
        </div>
        </div>

        {/* Footer Info */}
        <footer style={{ textAlign: 'center', marginTop: '48px', paddingBottom: '24px' }}>
          <p style={{ fontSize: '10px', color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
            v1.1.0 • Conectado a n8n-railway
          </p>
        </footer>
      </div>
    </div>
  );
}
