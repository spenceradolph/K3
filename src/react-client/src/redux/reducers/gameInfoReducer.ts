//prettier-ignore
import { COMBAT_PHASE_ID, NEWS_PHASE_ID, NOT_WAITING_STATUS, PLACE_PHASE_ID, PURCHASE_PHASE_ID, SLICE_EXECUTING_ID, SLICE_PLANNING_ID, WAITING_STATUS } from "../../constants/gameConstants";
//prettier-ignore
import { EventBattleAction, GameInitialStateAction, NewRoundAction, NewsPhaseAction, NoMoreEventsAction, ShopPurchaseAction, ShopRefundAction, UpdateFlagAction } from '../../constants/interfaces';
//prettier-ignore
import { COMBAT_PHASE, EVENT_BATTLE, INITIAL_GAMESTATE, MAIN_BUTTON_CLICK, NEWS_PHASE, NEW_ROUND, NO_MORE_EVENTS, PLACE_PHASE, PURCHASE_PHASE, SHOP_PURCHASE, SHOP_REFUND, SLICE_CHANGE, UPDATE_FLAGS } from "../actions/actionTypes";
import { AnyAction } from 'redux';
import { GameInfoState } from "../../interfaces/reducerTypes";

const initialGameInfoState: GameInfoState = {
    gameSection: 'Loading...',
    gameInstructor: 'Loading...',
    gameTeam: -1,
    gameControllers: [],
    gamePhase: -1,
    gameRound: -1,
    gameSlice: -1,
    gameStatus: -1,
    gamePoints: -1,
    flag0: -1,
    flag1: -1,
    flag2: -1,
    flag3: -1,
    flag4: -1,
    flag5: -1,
    flag6: -1,
    flag7: -1,
    flag8: -1,
    flag9: -1,
    flag10: -1,
    flag11: -1,
    flag12: -1
};

function gameInfoReducer(state = initialGameInfoState, action: AnyAction) {
    //TODO: figure out if deep copy works, or if regular works (stick to a standard...)

    const { type } = action;

    let stateDeepCopy = JSON.parse(JSON.stringify(state));
    switch (type) {
        case INITIAL_GAMESTATE:
            return (action as GameInitialStateAction).payload.gameInfo;
        case SHOP_PURCHASE:
            state.gamePoints = (action as ShopPurchaseAction).payload.points;
            return state;
        case NO_MORE_EVENTS:
            state.gameStatus = (action as NoMoreEventsAction).payload.gameStatus;
            return state;
        case SHOP_REFUND:
            state.gamePoints += (action as ShopRefundAction).payload.pointsAdded;
            return state;
        case PURCHASE_PHASE:
            stateDeepCopy.gamePhase = PURCHASE_PHASE_ID;
            stateDeepCopy.gameStatus = NOT_WAITING_STATUS;
            return stateDeepCopy;
        case UPDATE_FLAGS:
            Object.assign(stateDeepCopy, (action as UpdateFlagAction).payload);
            return stateDeepCopy;
        case MAIN_BUTTON_CLICK:
            stateDeepCopy.gameStatus = WAITING_STATUS;
            return stateDeepCopy;
        case COMBAT_PHASE:
            stateDeepCopy.gameStatus = NOT_WAITING_STATUS;
            stateDeepCopy.gamePhase = COMBAT_PHASE_ID;
            return stateDeepCopy;
        case SLICE_CHANGE:
            stateDeepCopy.gameStatus = NOT_WAITING_STATUS;
            stateDeepCopy.gameSlice = SLICE_EXECUTING_ID;
            return stateDeepCopy;
        case PLACE_PHASE:
            stateDeepCopy.gamePhase = PLACE_PHASE_ID;
            stateDeepCopy.gameStatus = NOT_WAITING_STATUS;
            return stateDeepCopy;
        case EVENT_BATTLE:
            if ((action as EventBattleAction).payload.gameStatus !== null) {
                stateDeepCopy.gameStatus = (action as EventBattleAction).payload.gameStatus;
            }
            return stateDeepCopy;
        case NEW_ROUND:
            stateDeepCopy.gameRound = (action as NewRoundAction).payload.gameRound;
            stateDeepCopy.gameStatus = NOT_WAITING_STATUS;
            stateDeepCopy.gameSlice = SLICE_PLANNING_ID;
            return stateDeepCopy;
        case NEWS_PHASE:
            stateDeepCopy.gamePhase = NEWS_PHASE_ID;
            stateDeepCopy.gameStatus = NOT_WAITING_STATUS;
            stateDeepCopy.gameRound = 0;
            stateDeepCopy.gameSlice = SLICE_PLANNING_ID;
            stateDeepCopy.gamePoints = (action as NewsPhaseAction).payload.gamePoints;
            return stateDeepCopy;
        default:
            return state;
    }
}

export default gameInfoReducer;
