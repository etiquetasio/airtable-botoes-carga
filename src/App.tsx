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
    <div className="min-h-screen bg-white p-6 font-sans text-[#1a1a1a] flex flex-col items-start justify-start pt-10">
      <div className="max-w-md mx-auto space-y-6 w-full">
        {/* Header */}
        <header className="space-y-4 mb-8">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Pullman_logo_2013.svg/1280px-Pullman_logo_2013.svg.png" 
            alt="Pullman Logo" 
            className="h-12 w-auto"
            referrerPolicy="no-referrer"
          />
          <div>
            <h1 className="text-2xl font-semibold tracking-tight uppercase">SINCRONIZAÇÃO DOS DADOS</h1>
            <p className="text-xs text-[#9e9e9e]">Sincroniza os dados do Airtable com o sistema das etiquetas eletrônicas by @etiquetas.io</p>
          </div>
        </header>

        <div className="flex flex-col gap-2 w-full items-start">
          <button
            onClick={() => triggerWebhook('telegram', WEBHOOKS.telegram)}
          disabled={activeStates['telegram']?.status === 'loading'}
          className="px-6 py-3 rounded text-sm font-semibold bg-[#FF00FF] text-white hover:opacity-90 transition-opacity whitespace-nowrap disabled:opacity-50"
        >
          {getButtonText('telegram', 'CANAL DO TELEGRAM')}
        </button>

        <button
          onClick={() => triggerWebhook('viradaCafe', WEBHOOKS.viradaCafe)}
          disabled={activeStates['viradaCafe']?.status === 'loading'}
          className="px-6 py-3 rounded text-sm font-semibold bg-[#00B050] text-white hover:opacity-90 transition-opacity whitespace-nowrap disabled:opacity-50"
        >
          {getButtonText('viradaCafe', 'VIRADA CAFÉ DA MANHÃ MANUAL')}
        </button>

        <button
          onClick={() => triggerWebhook('pratosAirtable', WEBHOOKS.pratosAirtable)}
          disabled={activeStates['pratosAirtable']?.status === 'loading'}
          className="px-6 py-3 rounded text-sm font-semibold bg-[#FFFF00] text-[#FF0000] hover:opacity-90 transition-opacity whitespace-nowrap disabled:opacity-50"
        >
          {getButtonText('pratosAirtable', 'PRATOS NO AIRTABLE')}
        </button>

        <button
          onClick={() => triggerWebhook('logoPullman', WEBHOOKS.logoPullman)}
          disabled={activeStates['logoPullman']?.status === 'loading'}
          className="px-6 py-3 rounded text-sm font-semibold bg-black text-white hover:opacity-90 transition-opacity whitespace-nowrap disabled:opacity-50"
        >
          {getButtonText('logoPullman', 'MUDAR LOGO PARA PULLMAN')}
        </button>

        <button
          onClick={() => triggerWebhook('logoBase', WEBHOOKS.logoBase)}
          disabled={activeStates['logoBase']?.status === 'loading'}
          className="px-6 py-3 rounded text-sm font-semibold bg-black text-white hover:opacity-90 transition-opacity whitespace-nowrap disabled:opacity-50"
        >
          {getButtonText('logoBase', 'MUDAR LOGO PARA BASE')}
        </button>

        <button
          onClick={() => triggerWebhook('cargaImagensAlergenicos', WEBHOOKS.cargaImagensAlergenicos)}
          disabled={activeStates['cargaImagensAlergenicos']?.status === 'loading'}
          className="px-6 py-3 rounded text-sm font-semibold bg-[#FF0000] text-white hover:opacity-90 transition-opacity whitespace-nowrap disabled:opacity-50"
        >
          {getButtonText('cargaImagensAlergenicos', 'CARGA IMAGENS ALERGÊNICOS')}
        </button>

        <button
          onClick={() => triggerWebhook('etiquetasLivre', WEBHOOKS.etiquetasLivre)}
          disabled={activeStates['etiquetasLivre']?.status === 'loading'}
          className="px-6 py-3 rounded text-sm font-semibold bg-[#3B82F6] text-white hover:opacity-90 transition-opacity whitespace-nowrap disabled:opacity-50"
        >
          {getButtonText('etiquetasLivre', 'COLOCAR ETIQUETAS EM LIVRE')}
        </button>

        <div className="flex flex-row gap-2">
          <button
            onClick={() => triggerWebhook('statusConta', WEBHOOKS.statusConta)}
            disabled={activeStates['statusConta']?.status === 'loading'}
            className="px-6 py-3 rounded text-sm font-semibold bg-[#ED7D31] text-white hover:opacity-90 transition-opacity whitespace-nowrap disabled:opacity-50"
          >
            {getButtonText('statusConta', 'STATUS SUA CONTA')}
          </button>
          
          <button
            onClick={() => triggerWebhook('backupTemplates', WEBHOOKS.backupTemplates)}
            disabled={activeStates['backupTemplates']?.status === 'loading'}
            className="px-6 py-3 rounded text-sm font-semibold bg-[#ED7D31] text-white hover:opacity-90 transition-opacity whitespace-nowrap disabled:opacity-50"
          >
            {getButtonText('backupTemplates', 'BACKUP TEMPLATES')}
          </button>
        </div>
        </div>

        {/* Footer Info */}
        <footer className="text-center mt-12 pb-6">
          <p className="text-[10px] text-[#9e9e9e] uppercase tracking-widest">
            v1.1.0 • Conectado a n8n-railway
          </p>
        </footer>
      </div>
    </div>
  );
}
