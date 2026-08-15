# 📚 Guia Passo a Passo DETALHADO - Fogo de Proposito Online

## PARTE 1: PREPARAR A MÁQUINA

### Passo 1: Instalar Node.js

Node.js é um programa que deixa você rodar JavaScript fora do navegador.

#### Windows:
1. Acesse: https://nodejs.org/
2. Clique no botão grande verde "LTS" (versão estável)
3. Um arquivo `.msi` será baixado
4. **Clique 2x no arquivo baixado** para instalar
5. Clique "Next" > "I agree" > "Next" > ... > "Finish"
6. **Reinicie seu computador**

#### Mac:
1. Acesse: https://nodejs.org/
2. Clique no botão grande verde "LTS"
3. Baixará um arquivo `.pkg`
4. **Clique 2x no arquivo**
5. Siga as instruções (próximo > próximo)
6. **Reinicie seu computador**

### Passo 2: Verificar se Instalou Corretamente

#### Windows:
1. Abra o "Prompt de Comando" (cmd):
   - Pressione `Windows + R`
   - Digite `cmd`
   - Pressione Enter

2. Digite o comando:
```bash
node --version
```

3. Se aparecer algo como `v18.15.0` = Instalou corretamente! ✅

#### Mac:
1. Abra o "Terminal":
   - Pressione `Command + Espaço`
   - Digite `terminal`
   - Pressione Enter

2. Digite:
```bash
node --version
```

3. Se aparecer a versão = Instalou corretamente! ✅

---

## PARTE 2: ORGANIZAR OS ARQUIVOS

### Passo 3: Criar Pasta do Projeto

#### Windows:
1. Abra o "Explorador de Arquivos" (aquela pasta no menu iniciar)
2. Vá até `Documentos` (ou qualquer lugar que queira)
3. **Clique com botão direito** em um espaço vazio
4. Selecione **"Nova Pasta"**
5. Nomeie como: `fogo-de-proposito`
6. Abra essa pasta

#### Mac:
1. Abra o "Finder"
2. Clique em "Documentos"
3. **Clique com botão direito** > "Nova Pasta"
4. Nomeie: `fogo-de-proposito`
5. Abra essa pasta

### Passo 4: Colocar os Arquivos na Pasta

Você baixou 7 arquivos principais. Organize assim:

1. **Crie uma subpasta** chamada `public` dentro de `fogo-de-proposito`
   - (Clique direito > Nova Pasta > `public`)

2. **Coloque os arquivos assim:**

```
fogo-de-proposito/
├── server.js              ← Coloque aqui (do download)
├── package.json           ← Coloque aqui (do download)
├── .gitignore             ← Coloque aqui (do download)
├── README.md              ← Coloque aqui (do download)
├── INICIO_RAPIDO.md       ← Coloque aqui (do download)
├── GUIA_DETALHADO.md      ← Coloque aqui (do download)
├── HOSPEDAGEM.md          ← Coloque aqui (do download)
├── RAILWAY_5_MINUTOS.md   ← Coloque aqui (do download)
├── RAILWAY_DETALHADO.md   ← Coloque aqui (do download)
└── public/                ← Pasta que você criou
    └── index.html         ← Coloque aqui (do download)
```

---

## PARTE 3: INSTALAR DEPENDÊNCIAS

### Passo 5: Abrir Terminal na Pasta do Projeto

#### Windows:
1. Abra a pasta `fogo-de-proposito`
2. Na barra acima onde vê o caminho da pasta, **clique direito**
3. Selecione **"Abrir PowerShell aqui"** ou **"Abrir terminal aqui"**
4. Uma janela preta vai abrir (é o terminal)

#### Mac:
1. Abra a pasta `fogo-de-proposito`
2. Clique com direito > **"Serviços"** > **"Novo terminal nessa pasta"**
3. Uma janela vai abrir (é o terminal)

### Passo 6: Instalar Node Modules

Na janela do terminal (que está aberta), digite:

```bash
npm install
```

Pressione `Enter` e **aguarde**. Quando acabar, você verá:
```
added 150 packages in 5.3s
```

✅ Pronto! As dependências foram instaladas!

---

## PARTE 4: RODAR O SERVIDOR

### Passo 7: Iniciar o Servidor

No **mesmo terminal** (que ainda está aberto), digite:

```bash
npm start
```

Pressione `Enter`.

Você verá:
```
Servidor rodando em http://localhost:3000
```

✅ **SEU SERVIDOR ESTÁ ATIVO!**

---

## PARTE 5: JOGAR

### Passo 8: Abrir o Jogo no Navegador

1. **Abra seu navegador** (Chrome, Firefox, Edge, Safari, etc)
2. Na barra de endereço, digite:
   ```
   http://localhost:3000
   ```
3. Pressione `Enter`

Você verá a tela do jogo!

### Passo 9: Criar Sua Primeira Sala

1. **Digite seu nome** no campo de texto
2. Clique no botão **"Criar Sala"**
3. Uma tela nova aparece com um **código de 6 letras**
4. **Copie esse código**

### Passo 10: Seus Amigos Entrarem

**Para CADA amigo:**

1. Eles abrem o navegador
2. Digitam: `http://localhost:3000` **OU** seu IP
3. Digitam o nome deles
4. Colam o código da sala
5. Clicam **"Entrar na Sala"**

### Passo 11: Iniciar o Jogo

1. Quando todos estiverem conectados
2. Clique no botão **"Iniciar Jogo"**
3. Pronto! O jogo começa! 🎉

---

Bom jogo! 🎮
