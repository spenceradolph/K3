import { UNABLE_TO_HIT } from '../../globals';
// prettier-ignore
import { AIRBORN_ISR_TYPE_ID, AIR_REFUELING_SQUADRON_ID, ARMY_INFANTRY_COMPANY_TYPE_ID, ARTILLERY_BATTERY_TYPE_ID, ATTACK_HELICOPTER_TYPE_ID, A_C_CARRIER_TYPE_ID, BOMBER_TYPE_ID, C_130_TYPE_ID, DESTROYER_TYPE_ID, LIGHT_INFANTRY_VEHICLE_CONVOY_TYPE_ID, MARINE_INFANTRY_COMPANY_TYPE_ID, MC_12_TYPE_ID, MISSILE_TYPE_ID, RADAR_TYPE_ID, SAM_SITE_TYPE_ID, SOF_TEAM_TYPE_ID, STEALTH_BOMBER_TYPE_ID, STEALTH_FIGHTER_TYPE_ID, SUBMARINE_TYPE_ID, TACTICAL_AIRLIFT_SQUADRON_TYPE_ID, TANK_COMPANY_TYPE_ID, TRANSPORT_TYPE_ID } from '../../pieces/pieceId';

export const sam: { [id: number]: number } = {};
sam[BOMBER_TYPE_ID] = 4;
sam[STEALTH_BOMBER_TYPE_ID] = 6;
sam[STEALTH_FIGHTER_TYPE_ID] = 7;
sam[AIR_REFUELING_SQUADRON_ID] = 3;
sam[TACTICAL_AIRLIFT_SQUADRON_TYPE_ID] = 4;
sam[AIRBORN_ISR_TYPE_ID] = 4;
sam[ARMY_INFANTRY_COMPANY_TYPE_ID] = UNABLE_TO_HIT;
sam[ARTILLERY_BATTERY_TYPE_ID] = UNABLE_TO_HIT;
sam[TANK_COMPANY_TYPE_ID] = UNABLE_TO_HIT;
sam[MARINE_INFANTRY_COMPANY_TYPE_ID] = UNABLE_TO_HIT;
sam[ATTACK_HELICOPTER_TYPE_ID] = 6;
sam[LIGHT_INFANTRY_VEHICLE_CONVOY_TYPE_ID] = UNABLE_TO_HIT;
sam[SAM_SITE_TYPE_ID] = UNABLE_TO_HIT;
sam[DESTROYER_TYPE_ID] = UNABLE_TO_HIT;
sam[A_C_CARRIER_TYPE_ID] = UNABLE_TO_HIT;
sam[SUBMARINE_TYPE_ID] = UNABLE_TO_HIT;
sam[TRANSPORT_TYPE_ID] = UNABLE_TO_HIT;
sam[MC_12_TYPE_ID] = 5;
sam[C_130_TYPE_ID] = 5;
sam[SOF_TEAM_TYPE_ID] = UNABLE_TO_HIT;
sam[RADAR_TYPE_ID] = UNABLE_TO_HIT;
sam[MISSILE_TYPE_ID] = UNABLE_TO_HIT;
