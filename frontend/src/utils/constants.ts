// Game constants for Half Suit card game

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
export const WS_BASE_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8000'

// Game Configuration
export const PLAYERS_PER_TEAM = 3
export const TOTAL_PLAYERS = 6
export const CARDS_PER_PLAYER = 9
export const TOTAL_HALF_SUITS = 9
export const CARDS_PER_HALF_SUIT = 6

// Card suits
export const SUITS = {
  SPADES: 'Spades',
  HEARTS: 'Hearts',
  DIAMONDS: 'Diamonds',
  CLUBS: 'Clubs',
  JOKER: 'Joker'
} as const

// Card ranks
export const RANKS = {
  TWO: '2',
  THREE: '3',
  FOUR: '4',
  FIVE: '5',
  SIX: '6',
  SEVEN: '7',
  EIGHT: '8',
  NINE: '9',
  TEN: '10',
  JACK: 'J',
  QUEEN: 'Q',
  KING: 'K',
  ACE: 'A',
  JOKER: 'Joker'
} as const

// Half suit definitions
export const HALF_SUITS = [
  {
    id: 0,
    name: '2-7 of Spades',
    suit: SUITS.SPADES,
    ranks: [RANKS.TWO, RANKS.THREE, RANKS.FOUR, RANKS.FIVE, RANKS.SIX, RANKS.SEVEN]
  },
  {
    id: 1,
    name: '9-A of Spades',
    suit: SUITS.SPADES,
    ranks: [RANKS.NINE, RANKS.TEN, RANKS.JACK, RANKS.QUEEN, RANKS.KING, RANKS.ACE]
  },
  {
    id: 2,
    name: '2-7 of Hearts',
    suit: SUITS.HEARTS,
    ranks: [RANKS.TWO, RANKS.THREE, RANKS.FOUR, RANKS.FIVE, RANKS.SIX, RANKS.SEVEN]
  },
  {
    id: 3,
    name: '9-A of Hearts',
    suit: SUITS.HEARTS,
    ranks: [RANKS.NINE, RANKS.TEN, RANKS.JACK, RANKS.QUEEN, RANKS.KING, RANKS.ACE]
  },
  {
    id: 4,
    name: '2-7 of Diamonds',
    suit: SUITS.DIAMONDS,
    ranks: [RANKS.TWO, RANKS.THREE, RANKS.FOUR, RANKS.FIVE, RANKS.SIX, RANKS.SEVEN]
  },
  {
    id: 5,
    name: '9-A of Diamonds',
    suit: SUITS.DIAMONDS,
    ranks: [RANKS.NINE, RANKS.TEN, RANKS.JACK, RANKS.QUEEN, RANKS.KING, RANKS.ACE]
  },
  {
    id: 6,
    name: '2-7 of Clubs',
    suit: SUITS.CLUBS,
    ranks: [RANKS.TWO, RANKS.THREE, RANKS.FOUR, RANKS.FIVE, RANKS.SIX, RANKS.SEVEN]
  },
  {
    id: 7,
    name: '9-A of Clubs',
    suit: SUITS.CLUBS,
    ranks: [RANKS.NINE, RANKS.TEN, RANKS.JACK, RANKS.QUEEN, RANKS.KING, RANKS.ACE]
  },
  {
    id: 8,
    name: 'All 8s + Jokers',
    suit: 'Mixed',
    ranks: [RANKS.EIGHT, RANKS.EIGHT, RANKS.EIGHT, RANKS.EIGHT, RANKS.JOKER, RANKS.JOKER]
  }
] as const

// Game states
export const GAME_STATUS = {
  LOBBY: 'lobby',
  ACTIVE: 'active',
  FINISHED: 'finished'
} as const

// Team colors for UI
export const TEAM_COLORS = {
  1: {
    primary: 'bg-blue-500',
    secondary: 'bg-blue-100',
    text: 'text-blue-700',
    border: 'border-blue-500'
  },
  2: {
    primary: 'bg-red-500',
    secondary: 'bg-red-100',
    text: 'text-red-700',
    border: 'border-red-500'
  }
} as const

// WebSocket events
export const WS_EVENTS = {
  ASK: 'ask',
  CLAIM: 'claim',
  COUNTER_CLAIM: 'counter_claim',
  STATE_UPDATE: 'state_update',
  ERROR: 'error',
  PLAYER_LEFT: 'player_left'
} as const

// Claim outcomes
export const CLAIM_OUTCOMES = {
  OWN_TEAM_CORRECT: 'own_team_correct',
  OWN_TEAM_INCORRECT: 'own_team_incorrect',
  COUNTER_CORRECT: 'counter_correct',
  COUNTER_INCORRECT: 'counter_incorrect',
  OTHER_TEAM_CORRECT: 'other_team_correct',
  OTHER_TEAM_INCORRECT: 'other_team_incorrect',
  SPLIT_AUTO_INCORRECT: 'split_auto_incorrect'
} as const

// UI Constants
export const MAX_GAME_ID_LENGTH = 10
export const MAX_PLAYER_NAME_LENGTH = 20
export const RECONNECT_DELAY = 3000 // milliseconds
export const HEARTBEAT_INTERVAL = 30000 // milliseconds

// Local storage keys
export const STORAGE_KEYS = {
  PLAYER_ID: 'half_suit_player_id',
  PLAYER_NAME: 'half_suit_player_name',
  GAME_ID: 'half_suit_game_id'
} as const