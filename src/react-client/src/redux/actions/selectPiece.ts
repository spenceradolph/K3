import { Dispatch } from 'redux';
import { emit, FullState } from '../';
import { DRONE_SWARMS_TYPE_ID, MISSILE_LAUNCH_DISRUPTION_TYPE_ID, SEA_MINES_TYPE_ID } from '../../../../constants';
// prettier-ignore
import { BombardmentRequestAction, DroneSwarmRequestAction, MissileDisruptRequestAction, MissileRequestAction, PieceClickAction, PieceType, PIECE_CLICK, SeaMineRequestAction, SERVER_BOMBARDMENT_CONFIRM, SERVER_DRONE_SWARM_CONFIRM, SERVER_MISSILE_CONFIRM, SERVER_MISSILE_DISRUPT_CONFIRM, SERVER_SEA_MINE_CONFIRM } from '../../../../types';

/**
 * Change the state based on the piece that the user selected.
 */
export const selectPiece = (selectedPiece: PieceType) => {
    return (dispatch: Dispatch, getState: () => FullState, sendToServer: typeof emit) => {
        const { planning } = getState();

        if (!planning.isActive) {
            const clientAction: PieceClickAction = {
                type: PIECE_CLICK,
                payload: {
                    selectedPiece
                }
            };

            dispatch(clientAction);
            return;
        }

        // else planning is active

        if (planning.missileSelecting) {
            setTimeout(() => {});
            if (window.confirm('Are you sure you want to attack this piece?')) {
                const clientAction: MissileRequestAction = {
                    type: SERVER_MISSILE_CONFIRM,
                    payload: {
                        selectedPiece: planning.missileSelecting,
                        selectedTargetPiece: selectedPiece
                    }
                };

                // TODO: client side checks

                sendToServer(clientAction);
            }
        }

        if (planning.bombardmentSelecting) {
            if (window.confirm('Are you sure you want to bombard this piece?')) {
                const clientAction: BombardmentRequestAction = {
                    type: SERVER_BOMBARDMENT_CONFIRM,
                    payload: {
                        selectedPiece: planning.bombardmentSelecting,
                        selectedTargetPiece: selectedPiece
                    }
                };

                // TODO: other client side checks

                sendToServer(clientAction);
                // TODO: should we just return from these? (be consistent between these if statements...don't let the file get too large (like selectPosition.....))
            }
        }

        if (planning.invItem && planning.invItem.invItemTypeId === SEA_MINES_TYPE_ID) {
            // TODO: client side checks and prevent server side checks if something is obvious (like this piece needs to be a transport of this team, and other planning stuff)

            if (window.confirm('Are you sure you want to place your sea mine here?')) {
                const clientAction: SeaMineRequestAction = {
                    type: SERVER_SEA_MINE_CONFIRM,
                    payload: {
                        selectedPiece,
                        invItem: planning.invItem
                    }
                };

                sendToServer(clientAction);
            }
        }

        if (planning.invItem && planning.invItem.invItemTypeId === DRONE_SWARMS_TYPE_ID) {
            if (window.confirm('Are you sure you want to place your drone swarm here?')) {
                const clientAction: DroneSwarmRequestAction = {
                    type: SERVER_DRONE_SWARM_CONFIRM,
                    payload: {
                        selectedPiece,
                        invItem: planning.invItem
                    }
                };

                sendToServer(clientAction);
            }
        }

        if (planning.invItem && planning.invItem.invItemTypeId === MISSILE_LAUNCH_DISRUPTION_TYPE_ID) {
            if (window.confirm('Are you sure you want to disrupt this missile?')) {
                const clientAction: MissileDisruptRequestAction = {
                    type: SERVER_MISSILE_DISRUPT_CONFIRM,
                    payload: {
                        selectedPiece,
                        invItem: planning.invItem
                    }
                };

                sendToServer(clientAction);
            }
        }

        return;
    };
};
