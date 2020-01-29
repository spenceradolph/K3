//prettier-ignore
import { ANTISAT_SELECTED, ATC_SCRAMBLE_SELECTED, BIO_WEAPON_SELECTED, COMM_INTERRUP_SELECTED, DRONE_SWARM_SELECTED, GOLDEN_EYE_SELECTED, INITIAL_GAMESTATE, INSURGENCY_SELECTED, MISSILE_DISRUPT_SELECTED, NUKE_SELECTED, PIECE_PLACE, RAISE_MORALE_SELECTED, REMOTE_SENSING_SELECTED, RODS_FROM_GOD_SELECTED, SEA_MINE_SELECTED, SHOP_TRANSFER, CYBER_DEFENSE_SELECTED } from "../../../../constants";
// prettier-ignore
import { AntiSatAction, AtcScrambleAction, BioWeaponsAction, CommInterruptAction, DroneSwarmAction, GameInitialStateAction, GoldenEyeAction, InsurgencyAction, InvItemPlaceAction, InvItemType, InvState, MissileDisruptAction, NukeAction, RaiseMoraleAction, RemoteSensingAction, RodsFromGodAction, SeaMineAction, ShopConfirmPurchaseAction, CyberDefenseAction } from '../../../../types';

type InvReducerActions =
    | GameInitialStateAction
    | ShopConfirmPurchaseAction
    | InvItemPlaceAction
    | RodsFromGodAction
    | RemoteSensingAction
    | InsurgencyAction
    | BioWeaponsAction
    | CyberDefenseAction
    | SeaMineAction
    | DroneSwarmAction
    | AntiSatAction
    | MissileDisruptAction
    | NukeAction
    | AtcScrambleAction
    | RaiseMoraleAction
    | GoldenEyeAction
    | CommInterruptAction;

type InvItemsPayloadAction = GameInitialStateAction | ShopConfirmPurchaseAction;

type InvItemCapabilityAction =
    | RodsFromGodAction
    | RemoteSensingAction
    | InsurgencyAction
    | BioWeaponsAction
    | RaiseMoraleAction
    | CyberDefenseAction
    | MissileDisruptAction
    | SeaMineAction
    | AntiSatAction
    | DroneSwarmAction
    | NukeAction
    | AtcScrambleAction
    | GoldenEyeAction
    | CommInterruptAction;

const initialInvState: InvState = [];

export function invReducer(state = initialInvState, action: InvReducerActions) {
    const { type } = action;

    let stateCopy: InvState = JSON.parse(JSON.stringify(state));

    switch (type) {
        case INITIAL_GAMESTATE:
        case SHOP_TRANSFER:
            return (action as InvItemsPayloadAction).payload.invItems;

        case PIECE_PLACE:
            return stateCopy.filter((invItem: InvItemType) => {
                return invItem.invItemId !== (action as InvItemPlaceAction).payload.invItemId;
            });

        case RODS_FROM_GOD_SELECTED:
        case REMOTE_SENSING_SELECTED:
        case INSURGENCY_SELECTED:
        case BIO_WEAPON_SELECTED:
        case RAISE_MORALE_SELECTED:
        case SEA_MINE_SELECTED:
        case DRONE_SWARM_SELECTED:
        case NUKE_SELECTED:
        case CYBER_DEFENSE_SELECTED:
        case MISSILE_DISRUPT_SELECTED:
        case ANTISAT_SELECTED:
        case GOLDEN_EYE_SELECTED:
        case ATC_SCRAMBLE_SELECTED:
        case COMM_INTERRUP_SELECTED:
            return stateCopy.filter((invItem: InvItemType) => {
                return invItem.invItemId !== (action as InvItemCapabilityAction).payload.invItem.invItemId;
            });

        default:
            return state;
    }
}
