import { Player } from "../types/general"

export interface GameState {
  currentPlayer: Player
  lastMoveIndex: number
  gameOver: boolean
  winner: Player | null
}

const initialState: GameState = {
  currentPlayer: Player.X,
  lastMoveIndex: -1,
  gameOver: false,
  winner: null as Player | null,
}

function resetState() {
  return {
    currentPlayer: Player.X,
    lastMoveIndex: -1,
    gameOver: false,
    winner: null,
  }
}

function gameReducer(state: GameState, action: any) {
  switch (action.type) {
    case "SET_CURRENT_PLAYER":
      return { ...state, currentPlayer: action.payload }
    case "SET_LAST_MOVE_INDEX":
      return { ...state, lastMoveIndex: action.payload }
    case "SET_GAME_OVER":
      return { ...state, gameOver: action.payload }
    case "SET_WINNER":
      return { ...state, winner: action.payload }
    case "RESET_GAME_STATE":
      return resetState()
    default:
      return state
  }
}

export { gameReducer, initialState }
