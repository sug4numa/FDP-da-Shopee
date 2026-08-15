const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ 
  server,
  perMessageDeflate: false
});

app.use(cors());
app.use(express.static('public'));

// Armazenar salas de jogo
const rooms = new Map();

// Propostas para o jogo
const propostas = [
  "Beba um shot em 3 segundos",
  "Faça um desafio de dança",
  "Conte uma piada",
  "Fale em outro idioma por 1 minuto",
  "Imite um animal",
  "Cante uma música inteira",
  "Faça 10 flexões",
  "Capriche no sotaque de outro estado",
  "Conte um segredo (que possa contar)",
  "Faça uma selfie engraçada",
  "Mande uma mensagem de voz estranha em um grupo",
  "Dança o passinho",
  "Faça uma pirueta",
  "Fale tipo Dracula por 2 minutos",
  "Saia da sala por 30 segundos",
  "Tire uma foto com a pior cara possível",
  "Cante do jeito de um famoso",
  "Ande como um pinguim",
  "Faça um desenho com os olhos fechados",
  "Descreva alguém na sala sem dizer o nome"
];

wss.on('connection', (ws) => {
  console.log('✅ Novo cliente conectado');
  
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      console.log('📨 Mensagem recebida:', data.type);
      
      switch(data.type) {
        case 'CREATE_ROOM':
          createRoom(ws, data);
          break;
        case 'JOIN_ROOM':
          joinRoom(ws, data);
          break;
        case 'SEND_MESSAGE':
          sendMessage(data);
          break;
        case 'START_GAME':
          startGame(data);
          break;
        case 'COMPLETE_PROPOSITION':
          completeProposition(data);
          break;
        case 'NEXT_ROUND':
          nextRound(data);
          break;
      }
    } catch (error) {
      console.error('❌ Erro processando mensagem:', error);
    }
  });
  
  ws.on('close', () => {
    console.log('🔌 Cliente desconectado');
    // Remover jogador de todas as salas
    rooms.forEach((room, roomId) => {
      room.players = room.players.filter(p => p.ws !== ws);
      if (room.players.length === 0) {
        rooms.delete(roomId);
        console.log('🗑️ Sala deletada:', roomId);
      }
    });
  });
});

function createRoom(ws, data) {
  const roomId = Math.random().toString(36).substring(7).toUpperCase();
  const room = {
    id: roomId,
    host: data.playerName,
    players: [
      {
        id: data.playerId,
        name: data.playerName,
        ws: ws,
        score: 0,
        completed: false
      }
    ],
    gameStarted: false,
    currentProposition: null,
    currentPlayerIndex: 0
  };
  
  rooms.set(roomId, room);
  
  console.log('🎯 Sala criada:', roomId);
  
  ws.send(JSON.stringify({
    type: 'ROOM_CREATED',
    roomId: roomId,
    room: formatRoomData(room)
  }));
}

function joinRoom(ws, data) {
  const room = rooms.get(data.roomId);
  
  if (!room) {
    console.log('❌ Sala não encontrada:', data.roomId);
    ws.send(JSON.stringify({
      type: 'ERROR',
      message: 'Sala não encontrada'
    }));
    return;
  }
  
  const player = {
    id: data.playerId,
    name: data.playerName,
    ws: ws,
    score: 0,
    completed: false
  };
  
  room.players.push(player);
  console.log('👥 Jogador entrou na sala', data.roomId, '- Total:', room.players.length);
  
  // IMPORTANTE: Primeiro manda para quem entrou
  ws.send(JSON.stringify({
    type: 'PLAYER_JOINED',
    room: formatRoomData(room)
  }));
  
  // Depois notifica todos os outros
  broadcastToRoom(data.roomId, {
    type: 'PLAYER_JOINED',
    room: formatRoomData(room)
  }, ws); // Exclui quem entrou (já recebeu acima)
}

function startGame(data) {
  const room = rooms.get(data.roomId);
  if (!room) {
    console.log('❌ Sala não encontrada ao iniciar jogo:', data.roomId);
    return;
  }
  
  room.gameStarted = true;
  room.currentPlayerIndex = 0;
  console.log('🎮 Jogo iniciado na sala:', data.roomId);
  sendNextProposition(data.roomId);
}

function sendNextProposition(roomId) {
  const room = rooms.get(roomId);
  if (!room) return;
  
  const currentPlayer = room.players[room.currentPlayerIndex];
  const proposition = propostas[Math.floor(Math.random() * propostas.length)];
  
  room.currentProposition = {
    text: proposition,
    player: currentPlayer.name,
    playerId: currentPlayer.id
  };
  
  // Reset do estado de conclusão
  room.players.forEach(p => p.completed = false);
  
  console.log('🎯 Nova proposta enviada para:', currentPlayer.name);
  
  broadcastToRoom(roomId, {
    type: 'NEW_PROPOSITION',
    proposition: room.currentProposition,
    currentPlayerName: currentPlayer.name
  });
}

function completeProposition(data) {
  const room = rooms.get(data.roomId);
  if (!room) {
    console.log('❌ Sala não encontrada ao completar proposta:', data.roomId);
    return;
  }
  
  const player = room.players.find(p => p.id === data.playerId);
  if (player) {
    player.completed = true;
    player.score += 10;
    console.log('✅ Proposta completada por:', player.name);
  }
  
  broadcastToRoom(data.roomId, {
    type: 'PROPOSITION_COMPLETED',
    playerName: player.name,
    room: formatRoomData(room)
  });
}

function nextRound(data) {
  const room = rooms.get(data.roomId);
  if (!room) {
    console.log('❌ Sala não encontrada ao passar para próxima rodada:', data.roomId);
    return;
  }
  
  room.currentPlayerIndex = (room.currentPlayerIndex + 1) % room.players.length;
  console.log('⏭️ Próxima rodada - jogador:', room.players[room.currentPlayerIndex].name);
  sendNextProposition(data.roomId);
}

function sendMessage(data) {
  broadcastToRoom(data.roomId, {
    type: 'CHAT_MESSAGE',
    playerName: data.playerName,
    message: data.message
  });
}

function broadcastToRoom(roomId, message, excludeWs = null) {
  const room = rooms.get(roomId);
  if (!room) return;
  
  room.players.forEach(player => {
    if (player.ws.readyState === WebSocket.OPEN) {
      // Se excludeWs foi fornecido, não manda para esse WebSocket
      if (excludeWs && player.ws === excludeWs) return;
      player.ws.send(JSON.stringify(message));
    }
  });
}

function formatRoomData(room) {
  return {
    id: room.id,
    host: room.host,
    gameStarted: room.gameStarted,
    currentProposition: room.currentProposition,
    players: room.players.map(p => ({
      id: p.id,
      name: p.name,
      score: p.score,
      completed: p.completed
    }))
  };
}

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
