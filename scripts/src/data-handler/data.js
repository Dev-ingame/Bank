import { Player, world } from "@minecraft/server";

const players = world.getPlayers();

const defaultData = { purse: 0, bank: 5000 };

/**
 * @param {Player} target
 */
export const getData = (target) => {
    const data = JSON.parse(target.getDynamicProperty("bank"));
    if (data == null || undefined) return saveData(target, defaultData);
    return data;
};

/**
 *  load the bank Data
 */
export const loadData = () => {
    if (players[0].getDynamicProperty("bank") == null || undefined) {
        players.forEach((player) => {
            return saveData(player, defaultData);
        });
    }
}

/**
 * @param {Player} target
 */
export const saveData = (target, value) => {
    const data = target.setDynamicProperty("bank", JSON.stringify(value));
};
