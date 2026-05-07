# Airtable Carga Extension

Esta é uma extensão customizada para o Airtable que permite disparar webhooks no n8n para sincronização de dados.

## Funcionalidades

- **Carga de Alergênicos**: Dispara o webhook `https://n8n-railway.etiquetas.io/webhook/alergenicos-vo`.
- **Carga Full Pratos**: Dispara o webhook `https://n8n-railway.etiquetas.io/webhook/carga-full-vo`.

## Como configurar no seu computador (Resolução de Erros)

Se você está recebendo o erro `remote.json should be a non-null object` ou problemas com o `block init`, siga estes passos exatos:

### 1. Limpeza de Cache (Obrigatório se houver erro)
No seu terminal (dentro da pasta `airtable-botoes-carga`), delete a pasta de configuração oculta que está corrompida:
- No Windows (CMD): `rmdir /s /q .block`
- No Windows (PowerShell): `Remove-Item -Recurse -Force .block`
- No Mac/Linux: `rm -rf .block`

### 2. Vincular à Extensão Corretamente
Como a pasta já contém o código, não use `block init` (ele exige uma pasta vazia). Use o comando `set-remote`:
```bash
block set-remote appBP7blwMcpT3Qao/blk0FRHFL4SJaAMyY
```

### 3. Rodar o Projeto
Agora tente rodar novamente:
```bash
npm install
block run
```

---

### Se o `set-remote` não funcionar:
Se o comando acima disser que não é um diretório de bloco, faça o seguinte:
1. Renomeie sua pasta atual para `airtable-botoes-carga-backup`.
2. Crie uma nova pasta vazia com o nome `airtable-botoes-carga` e entre nela.
3. Rode o comando init original: `block init appBP7blwMcpT3Qao/blk0FRHFL4SJaAMyY .`
4. Copie os arquivos da pasta `src` do backup para a nova pasta `src`.
5. Substitua também os arquivos `block.json`, `package.json` e `vite.config.ts` se necessário.
6. Rode `block run`.

## Configuração

Os URLs dos webhooks estão configurados diretamente no arquivo `src/App.tsx`.
