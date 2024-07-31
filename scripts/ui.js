import { Player, system } from "@minecraft/server";
import {
    ActionFormData,
    ActionFormResponse,
    FormCancelationReason,
    ModalFormData,
} from "@minecraft/server-ui";
import { getData, saveData } from "./src/data-handler/data";

export async function forceShow(player, form, timeout = Infinity) {
    const startTick = system.currentTick;
    while (system.currentTick - startTick < timeout) {
        const response = await form.show(player);
        if (response.cancelationReason !== FormCancelationReason.UserBusy) {
            return response;
        }
    }
    throw new Error(`Timed out`);
}

/**
 *
 * @param {Player} actor
 */
const bankUi = (actor) => {
    const data = getData(actor);
    const form = new ActionFormData();
    form.title(`§a${actor.name} §eBank`);
    form.body(`\n§eWallet: §a${data.purse}\n\n§eBank: §a${data.bank}\n`);
    form.button("Deposit");
    form.button("Withdraw");
    // form.show(actor);
    return form;
};
const depositUi = (actor) => {
    const form = new ModalFormData();
    form.title("§eDeposit");
    form.textField("", "amount");
    form.submitButton("§eSubmit");
    return form.show(actor);
};
const withdrawUi = (actor) => {
    const form = new ModalFormData();
    form.title("§eWithdraw");
    form.textField("", "amount");
    form.submitButton("§eSubmit");
    return form.show(actor);
};

/**
 *
 * @param {Player} actor
 */


export const handleDeposit = async (actor) => {
    const response = await depositUi(actor);
    const data = getData(actor);
    if (response) {
        const value = response.formValues;
        if (isNaN(value)) {
            mainUi({ actor });
            return actor.sendMessage("§cInvalid amount");
        } else if (value > data.purse) {
            mainUi({ actor });
            return actor.sendMessage("§cDon't Have Enough Money");
        }

        saveData(actor, {
            purse: data.purse - value,
            bank: data.bank + parseFloat(value),
        });
        mainUi({ actor });
    }
};

export const handleWithdraw = async (actor) => {
    const response = await withdrawUi(actor);
    const data = getData(actor);
    if (response) {
        const value = response.formValues;
        if (isNaN(value)) {
            mainUi({ actor });
            return actor.sendMessage("§cInvalid amount");
        } else if (value > data.bank) {
            mainUi({ actor });
            return actor.sendMessage("§cDon't Have Enough Money");
        }

        saveData(actor, {
            purse: data.purse + parseFloat(value),
            bank: data.bank - value,
        });
        mainUi({ actor });
    }
};

export const mainUi = async ({ msg, actor, command, args }) => {
    const res = await forceShow(actor, bankUi(actor), 1000);

    switch (res.selection) {
        case 0:
            handleDeposit(actor);
            break;
        case 1:
            handleWithdraw(actor);
            break;
        default:
            break;
    }
};
