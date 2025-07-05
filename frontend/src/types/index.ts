// TypeScript types for Half Suit card game
// These mirror the Pydantic models from the backend specification

export interface Card {
    rank: string // '2'-'A', 'Joker'
    suit: string // 'Spades', 'Hearts', 'Diamonds', 'Clubs', 'Joker'
    half_suit_id: number // 0-8
    unique_id: string // e.g., "2S-1", "Joker-A"
  }
  
  export interface Player {
    id: string
    name: string
    team_id: number
    hand: Card[] // Empty for other players, only populated for the player's own state
    num_cards: number // Publicly visible card count
  }
  
  export interface Team {
    id: number
    name: string
    score: number
    players: string[] // List of player IDs
  }
  
  export interface HalfSuit {
    id: number
    name: string
    cards: Card[] // The 6 cards belonging to this half-suit
    claimed_by: number | null // ID of the team that successfully claimed this half-suit
    out_of_play: boolean // True if this half-suit has been claimed and discarded
  }
  
  export interface AskRecord {
    turn: number
    asker: string // Player ID of the asker
    respondent: string // Player ID of the respondent
    card: Card // The card that was asked for
    success: boolean // True if the respondent had the card
  }
  
  export interface ClaimRecord {
    turn: number
    claimant: string // Player ID of the claimant
    half_suit_id: number
    assignments: Record<string, string> // card.unique_id -> player_id mapping
    outcome: string // Claim outcome type
    point_to: number // Team ID that won the point
  }
  
  export interface GameState {
    game_id: string
    players: Player[]
    teams: Team[]
    half_suits: HalfSuit[]
    ask_history: AskRecord[]
    claim_history: ClaimRecord[]
    current_team: number // ID of the team whose turn it is
    current_player: string | null // ID of the player currently taking the turn
    status: string // 'lobby', 'active', 'finished'
  }
  
  // API Request/Response types
  export interface CreateGameRequest {
    creator_name: string
  }
  
  export interface CreateGameResponse {
    game_id: string
  }
  
  export interface JoinGameRequest {
    game_id: string
    player_name: string
  }
  
  export interface JoinGameResponse {
    player_id: string
    team_id: number
  }
  
  export interface StartGameRequest {
    game_id: string
    player_id: string
  }
  
  export interface StartGameResponse {
    ok: boolean
  }
  
  // WebSocket event types
  export interface WSAskEvent {
    from_id: string
    to_id: string
    card: Card
  }
  
  export interface WSClaimEvent {
    player_id: string
    half_suit_id: number
    assignments: Record<string, string>
    claim_for_other_team?: boolean
  }
  
  export interface WSCounterClaimEvent {
    player_id: string
    half_suit_id: number
    assignments: Record<string, string>
  }
  
  export interface WSStateUpdateEvent {
    game_state: GameState
  }
  
  export interface WSErrorEvent {
    message: string
  }
  
  export interface WSPlayerLeftEvent {
    player_id: string
  }
  
  // Union type for all WebSocket events
  export type WSEvent = 
    | { type: 'ask'; data: WSAskEvent }
    | { type: 'claim'; data: WSClaimEvent }
    | { type: 'counter_claim'; data: WSCounterClaimEvent }
    | { type: 'state_update'; data: WSStateUpdateEvent }
    | { type: 'error'; data: WSErrorEvent }
    | { type: 'player_left'; data: WSPlayerLeftEvent }
  
  // UI-specific types
  export interface ClaimAssignment {
    card_unique_id: string
    player_id: string
    card: Card
  }
  
  export interface CounterClaimState {
    required: boolean
    half_suit_id: number | null
    nominating_team: number | null
  }
  
  export interface UIState {
    loading: boolean
    error: string | null
    showAskModal: boolean
    showClaimModal: boolean
    showCounterClaimModal: boolean
    counterClaimState: CounterClaimState
    selectedHalfSuit: number | null
  }
  
  // Form types
  export interface AskFormData {
    target_player: string
    card: Card | null
  }
  
  export interface ClaimFormData {
    half_suit_id: number
    assignments: ClaimAssignment[]
    claim_for_other_team: boolean
  }
  
  export interface CounterClaimFormData {
    half_suit_id: number
    assignments: ClaimAssignment[]
  }
  
  // Utility types
  export type GameStatus = 'lobby' | 'active' | 'finished'
  export type ClaimOutcome = 'own_team_correct' | 'own_team_incorrect' | 'counter_correct' | 'counter_incorrect' | 'other_team_correct' | 'other_team_incorrect' | 'split_auto_incorrect'
  
  // Component prop types
  export interface BaseComponentProps {
    className?: string
    children?: React.ReactNode
  }
  
  export interface GameComponentProps extends BaseComponentProps {
    gameState: GameState
    currentPlayer: Player | null
    onAction?: (action: unknown) => void
  }