import { UNABLE_TO_SEE } from '../../globals';
// prettier-ignore
import { AIRBORN_ISR_TYPE_ID, AIR_REFUELING_SQUADRON_ID, ARMY_INFANTRY_COMPANY_TYPE_ID, ARTILLERY_BATTERY_TYPE_ID, ATTACK_HELICOPTER_TYPE_ID, A_C_CARRIER_TYPE_ID, BOMBER_TYPE_ID, C_130_TYPE_ID, DESTROYER_TYPE_ID, LIGHT_INFANTRY_VEHICLE_CONVOY_TYPE_ID, MARINE_INFANTRY_COMPANY_TYPE_ID, MC_12_TYPE_ID, MISSILE_TYPE_ID, RADAR_TYPE_ID, SAM_SITE_TYPE_ID, SOF_TEAM_TYPE_ID, STEALTH_BOMBER_TYPE_ID, STEALTH_FIGHTER_TYPE_ID, SUBMARINE_TYPE_ID, TACTICAL_AIRLIFT_SQUADRON_TYPE_ID, TANK_COMPANY_TYPE_ID, TRANSPORT_TYPE_ID } from '../../pieces/pieceId';

export const artillery: { [id: number]: number } = {};
artillery[BOMBER_TYPE_ID] = UNABLE_TO_SEE;
artillery[STEALTH_BOMBER_TYPE_ID] = UNABLE_TO_SEE;
artillery[STEALTH_FIGHTER_TYPE_ID] = UNABLE_TO_SEE;
artillery[AIR_REFUELING_SQUADRON_ID] = UNABLE_TO_SEE;
artillery[TACTICAL_AIRLIFT_SQUADRON_TYPE_ID] = UNABLE_TO_SEE;
artillery[AIRBORN_ISR_TYPE_ID] = UNABLE_TO_SEE;
artillery[ARMY_INFANTRY_COMPANY_TYPE_ID] = 1;
artillery[ARTILLERY_BATTERY_TYPE_ID] = 1;
artillery[TANK_COMPANY_TYPE_ID] = 1;
artillery[MARINE_INFANTRY_COMPANY_TYPE_ID] = 1;
artillery[ATTACK_HELICOPTER_TYPE_ID] = 1;
artillery[LIGHT_INFANTRY_VEHICLE_CONVOY_TYPE_ID] = 1;
artillery[SAM_SITE_TYPE_ID] = 1;
artillery[DESTROYER_TYPE_ID] = 0;
artillery[A_C_CARRIER_TYPE_ID] = 0;
artillery[SUBMARINE_TYPE_ID] = UNABLE_TO_SEE;
artillery[TRANSPORT_TYPE_ID] = 0;
artillery[MC_12_TYPE_ID] = UNABLE_TO_SEE;
artillery[C_130_TYPE_ID] = UNABLE_TO_SEE;
artillery[SOF_TEAM_TYPE_ID] = 0;
artillery[RADAR_TYPE_ID] = 1;
artillery[MISSILE_TYPE_ID] = UNABLE_TO_SEE;
