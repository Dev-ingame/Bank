import { Player } from "@minecraft/server";
import { forceShow, handleDeposit, mainUi } from "./ui";
import { commandBuilder } from "./src/chat-handler/commandBuilder";
import { getData, saveData } from "./src/data-handler/data";

const prefix = "!";

commandBuilder.registerCommand(
    "bank",
    "bank :]",
    /**
     * @param {Player} actor
     */
    (msg, actor, command, args) => {
        mainUi({ msg, actor, command, args });
        actor.sendMessage("§eClose The Chat To See The Bank Form");
    }
);

commandBuilder.registerCommand(
    "test",
    "test",
    async (msg, actor, command, args) => {
        // console.warn(JSON.stringify(getData(actor)));
        const data = getData(actor);
        saveData(actor, {purse: 5000, bank: 10000})
        console.warn(data.purse);
    }
);

commandBuilder.registerCommand("deposit", "deposit money", (msg, actor, command, args)=>{
    forceShow(actor,handleDeposit(actor), 1000)
})
