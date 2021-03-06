import { OkPacket, RowDataPacket } from 'mysql2/promise';
import { ShopItemType, GameType, BlueOrRedTeamId } from '../../types';
import { pool } from '../database';

/**
 * Represents rows for shopItems table in database.
 */
export class ShopItem implements ShopItemType {
    shopItemId: ShopItemType['shopItemId'];

    shopItemGameId: ShopItemType['shopItemGameId'];

    shopItemTeamId: ShopItemType['shopItemTeamId'];

    shopItemTypeId: ShopItemType['shopItemTypeId'];

    constructor(shopItemId: ShopItemType['shopItemId']) {
        this.shopItemId = shopItemId;
    }

    /**
     * Get's information from database about this object.
     */
    async init() {
        const queryString = 'SELECT * FROM shopItems WHERE shopItemId = ?';
        const inserts = [this.shopItemId];
        const [results] = await pool.query<RowDataPacket[] & ShopItemType[]>(queryString, inserts);

        if (results.length !== 1) {
            return null;
        }
        Object.assign(this, results[0]);
        return this;
    }

    /**
     * Delete this ShopItem from the database.
     */
    async delete() {
        const queryString = 'DELETE FROM shopItems WHERE shopItemId = ?';
        const inserts = [this.shopItemId];
        await pool.query(queryString, inserts);
    }

    /**
     * Insert a ShopItem into the database.
     */
    static async insert(
        shopItemGameId: ShopItemType['shopItemGameId'],
        shopItemTeamId: ShopItemType['shopItemTeamId'],
        shopItemTypeId: ShopItemType['shopItemTypeId']
    ) {
        const queryString = 'INSERT INTO shopItems (shopItemGameId, shopItemTeamId, shopItemTypeId) values (?, ?, ?)';
        const inserts = [shopItemGameId, shopItemTeamId, shopItemTypeId];
        const [results] = await pool.query<OkPacket>(queryString, inserts);
        const thisShopItem = await new ShopItem(results.insertId).init(); // TODO: this could fail, need to handle that error (rare tho)
        return thisShopItem;
    }

    /**
     * Delete all ShopItems in the database for this game's team.
     */
    static async deleteAll(gameId: GameType['gameId'], gameTeam: BlueOrRedTeamId) {
        const queryString = 'DELETE FROM shopItems WHERE shopItemGameId = ? AND shopItemTeamId = ?';
        const inserts = [gameId, gameTeam];
        await pool.query(queryString, inserts);
    }

    /**
     * Get all ShopItems in the database for this game's team.
     */
    static async all(gameId: GameType['gameId'], gameTeam: BlueOrRedTeamId): Promise<ShopItemType[]> {
        const queryString = 'SELECT * FROM shopItems WHERE shopItemGameId = ? AND shopItemTeamId = ?';
        const inserts = [gameId, gameTeam];
        const [shopItems] = await pool.query<RowDataPacket[] & ShopItemType[]>(queryString, inserts);
        return shopItems;
    }
}
