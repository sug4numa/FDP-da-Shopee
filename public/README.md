# 🎉 Fogo de Proposito - Multiplayer Online

Um jogo divertido de propostas multiplayer para jogar com amigos em tempo real!

## Como Funciona

- **Crie uma sala** e compartilhe o código com seus amigos
- **Cada rodada**, uma proposta aleatória é dada a um jogador
- **Todos votam** se aquele jogador completou a proposta
- **Ganhe pontos** por cada proposta completada
- **Divirta-se** com amigos online!

## Instalação

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm (geralmente vem com Node.js)

### Passos

1. **Clone ou extraia o projeto**
```bash
cd fogo-de-proposito-online
```

2. **Instale as dependências**
```bash
npm install
```

3. **Inicie o servidor**
```bash
npm start
```

O servidor iniciará em `http://localhost:3000`

## Como Jogar

### Iniciando uma Partida

1. **Abra o navegador** e acesse `http://localhost:3000`
2. **Digite seu nome**
3. **Clique em "Criar Sala"**
4. **Copie o código** da sala (ex: `ABC123`)
5. **Compartilhe o código** com seus amigos (WhatsApp, Discord, etc)

### Entrando em uma Sala

1. **Abra `http://localhost:3000`** (na máquina do seu amigo)
2. **Digite o nome dele**
3. **Cole o código** da sala
4. **Clique em "Entrar na Sala"**

### Durante o Jogo

1. O **criador da sala** clica em "Iniciar Jogo"
2. Uma **proposta é sorteada** para um jogador
3. Esse jogador tenta **completar a proposta**
4. Os **outros votam** se completou
5. **Ganham 10 pontos** os que votaram correto
6. **Próxima proposta** é sorteada!

## Exemplos de Propostas

- Beba um shot em 3 segundos
- Faça um desafio de dança
- Conte uma piada
- Fale em outro idioma por 1 minuto
- Imite um animal
- Cante uma música inteira
- E muito mais!

## Jogar com Amigos de Outras Cidades

Se quer jogar com amigos em outro computador (mesma rede WiFi):

1. **Descubra o IP da sua máquina:**
   - Windows: abra cmd e digite `ipconfig` (procure por IPv4)
   - Mac/Linux: abra terminal e digite `ifconfig` (procure por inet)
   - Exemplo: `192.168.1.100`

2. **Amigos usam:** `http://SEU_IP:3000`
   - Exemplo: `http://192.168.1.100:3000`

## Ou Hospede Online

Para jogar com amigos de qualquer lugar, você pode hospedar em:

- **Railway** (grátis, $5/mês de crédito)
- **Replit** (grátis e fácil)
- **Seu próprio servidor**

Instruções para Railway:
```bash
# 1. Crie conta em railway.app
# 2. Conecte seu GitHub
# 3. Selecione este repositório
# 4. Deploy automático!
```

## Customização

### Adicionar Novas Propostas

Edit o arquivo `server.js` e modifique a lista `propostas`:

```javascript
const propostas = [
  "Sua proposta aqui",
  "Outra proposta",
  // ... mais propostas
];
```

### Mudar Pontos

No `server.js`, procure por:
```javascript
player.score += 10;  // Mude o 10 para outro valor
```

## Troubleshooting

**Erro: "Cannot find module"**
- Execute: `npm install`

**Porta 3000 já está em uso:**
- Mude a porta: `PORT=3001 npm start`
- Acesse: `http://localhost:3001`

**Amigos não conseguem conectar:**
- Verifique se o firewall está permitindo a porta 3000
- Use o IP da máquina (instruções acima)

**Conexão cai:**
- Reinicie o servidor
- Verifique a conexão de internet

## Dúvidas?

Este é um projeto simples e amador. Sinta-se livre para:
- Adicionar novas funcionalidades
- Customizar as propostas
- Modificar a aparência
- Melhorar o código

Divirta-se! 🎉
