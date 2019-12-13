import { Event, Piece } from "../classes";
import { EVENT_BATTLE, NO_MORE_EVENTS, EVENT_REFUEL } from "../../react-client/src/redux/actions/actionTypes";
import { AIR_REFUELING_SQUADRON_ID, BLUE_TEAM_ID, RED_TEAM_ID } from "../../react-client/src/constants/gameConstants";
import { SOCKET_SERVER_SENDING_ACTION } from "../../react-client/src/constants/otherConstants";
import { Socket } from "socket.io";
import sendUserFeedback from "./sendUserFeedback";
import { POS_BATTLE_EVENT_TYPE, COL_BATTLE_EVENT_TYPE, REFUEL_EVENT_TYPE } from "./eventConstants";

const giveNextEvent = async (socket: Socket, options: any) => {
    const { thisGame, gameTeam } = options;
    const { gameId } = thisGame;

    const otherTeam = gameTeam == BLUE_TEAM_ID ? RED_TEAM_ID : BLUE_TEAM_ID;

    let gameboardPiecesList; //if came from 'executeStep', send new piece locations along with actions
    if (options.executingStep) {
        gameboardPiecesList = await Piece.getVisiblePieces(gameId, gameTeam);
    }

    let serverAction = {}; //store the action, send at the end

    const gameEvent = await Event.getNext(gameId, gameTeam);
    if (gameEvent) {
        switch (gameEvent.eventTypeId) {
            case COL_BATTLE_EVENT_TYPE:
            case POS_BATTLE_EVENT_TYPE:
                let friendlyPiecesList: any = await gameEvent.getTeamItems(gameTeam);
                let enemyPiecesList: any = await gameEvent.getTeamItems(otherTeam);
                let friendlyPieces: any = [];
                let enemyPieces: any = [];

                for (let x = 0; x < friendlyPiecesList.length; x++) {
                    let thisFriendlyPiece: any = {
                        targetPiece: null,
                        targetPieceIndex: -1
                    };
                    thisFriendlyPiece.piece = friendlyPiecesList[x];
                    friendlyPieces.push(thisFriendlyPiece);
                }

                for (let y = 0; y < enemyPiecesList.length; y++) {
                    let thisEnemyPiece: any = {
                        targetPiece: null,
                        targetPieceIndex: -1
                    };
                    thisEnemyPiece.piece = enemyPiecesList[y];
                    enemyPieces.push(thisEnemyPiece);
                }

                serverAction = {
                    type: EVENT_BATTLE,
                    payload: {
                        friendlyPieces,
                        enemyPieces,
                        gameboardPieces: options.executingStep ? gameboardPiecesList : null,
                        gameStatus: options.executingStep ? 0 : null
                    }
                };
                break;
            case REFUEL_EVENT_TYPE:
                //get the pieces from the event, put them into payload (pre-format based on state?)
                let allRefuelEventItems: any = await gameEvent.getRefuelItems();

                let tankers = [];
                let aircraft = [];
                for (let x = 0; x < allRefuelEventItems.length; x++) {
                    //put each piece into the refuel event....
                    let thisPiece = allRefuelEventItems[x];
                    let { pieceId, pieceTypeId, pieceFuel, pieceMoves } = thisPiece;
                    if (pieceTypeId === AIR_REFUELING_SQUADRON_ID) {
                        tankers.push(thisPiece);
                    } else {
                        aircraft.push(thisPiece);
                    }
                }

                serverAction = {
                    type: EVENT_REFUEL,
                    payload: {
                        tankers,
                        aircraft,
                        gameboardPieces: options.executingStep ? gameboardPiecesList : null,
                        gameStatus: options.executingStep ? 0 : null
                    }
                };
                break;
            default:
                sendUserFeedback(socket, "Server Error, unknown event type...");
                return;
        }
    } else {
        serverAction = {
            type: NO_MORE_EVENTS,
            payload: {
                gameboardPieces: options.executingStep ? gameboardPiecesList : null,
                gameStatus: options.executingStep ? 0 : null
            }
        };
    }

    //sending the event that we got, or "no more events"? (but also sending piece moves after this
    socket.to("game" + gameId + "team" + gameTeam).emit(SOCKET_SERVER_SENDING_ACTION, serverAction);

    if (socket.handshake.session.ir3.gameTeam == gameTeam) {
        socket.emit(SOCKET_SERVER_SENDING_ACTION, serverAction);
    }
};

export default giveNextEvent;
