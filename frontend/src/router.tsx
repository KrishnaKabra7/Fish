import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CreateGame from './components/lobby/CreateGame';
import JoinGame from './components/lobby/JoinGame';
import GameLobby from './components/lobby/GameLobby';
import GameBoard from './components/game/GameBoard';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Default route redirects to game creation */}
      <Route path="/" element={<Navigate to="/create" replace />} />
      
      {/* Game creation route */}
      <Route path="/create" element={<CreateGame />} />
      
      {/* Game joining route */}
      <Route path="/join" element={<JoinGame />} />
      
      {/* Game lobby route - shows before game starts */}
      <Route path="/lobby/:gameId" element={<GameLobby />} />
      
      {/* Active game route */}
      <Route path="/game/:gameId" element={<GameBoard />} />
      
      {/* Catch-all route for invalid paths */}
      <Route path="*" element={<Navigate to="/create" replace />} />
    </Routes>
  );
};