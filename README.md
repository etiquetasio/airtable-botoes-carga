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

### Se o `set-remote` não funcionar ou para repositórios privados:
Como o repositório no GitHub é **privado**, o comando `--template` não funcionará. Siga exatamente estes passos para configurar:

1. Saia da pasta atual e renomeie-a para um backup:
   ```bash
   cd ..
   ren airtable-botoes-carga airtable-botoes-carga-backup
   ```
2. Crie a extensão do zero (substitua pelo seu ID atual se for diferente):
   ```bash
   block init appFM4C1E4afDoBrA/blkrPN0JOaQjlCUON airtable-botoes-carga
   ```
3. Entre na pasta recém-criada:
   ```bash
   cd airtable-botoes-carga
   ```
4. Copie os arquivos da pasta de backup para a sua nova pasta:
   * Copie a pasta `src` inteira.
   * Copie os arquivos `package.json`, `vite.config.ts` e `block.json`.
   *(No Windows, você pode arrastar e soltar pelo Explorador de Arquivos para substituir os arquivos originais).*

5. Instale as dependências e rode a extensão:
   ```bash
   npm install
   block run
   ```

## Configuração

Os URLs dos webhooks estão configurados diretamente no arquivo `src/App.tsx`.
