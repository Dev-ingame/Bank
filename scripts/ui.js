import { system } from "@minecraft/server";
import { FormCancelationReason, ModalFormData } from "@minecraft/server-ui";

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

export const mainUi = () => {
    const ui = new ModalFormData();
    ui.title = "Test UI";
    ui.toggle("test")
    ui.textField("test", "test", "tests");
    ui.submitButton("test");
    return ui
};
