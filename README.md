# Airtable Carga Extension

Esta é uma extensão customizada para o Airtable que permite disparar webhooks no n8n para sincronização de dados.

## Funcionalidades

- **Carga de Alergênicos**: Dispara o webhook `https://n8n-railway.etiquetas.io/webhook/alergenicos-vo`.
- **Carga Full Pratos**: Dispara o webhook `https://n8n-railway.etiquetas.io/webhook/carga-full-vo`.

## Como configurar no seu computador

1. Clone este repositório no seu computador.
2. No seu terminal, entre na pasta do projeto.
3. Se você recebeu um erro sobre `remote.json`, apague a pasta oculta `.block` (ela pode estar oculta).
4. Como você já tem os arquivos, em vez de `block init`, use o comando `block set-remote` para vincular esta pasta à sua extensão do Airtable:
   ```bash
   block set-remote appBP7blwMcpT3Qao/blk0FRHFL4SJaAMyY
   ```
5. Agora você pode rodar os comandos normais:
   ```bash
   npm install
   block run
   ```
6. No Airtable, sua extensão agora deve carregar o código desta pasta!

## Configuração

Os URLs dos webhooks estão configurados diretamente no arquivo `src/App.tsx`.
