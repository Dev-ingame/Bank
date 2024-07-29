import { forceShow, mainUi } from "../ui";
import { commandBuilder } from "./commandBuilder";

const prefix = "!";

commandBuilder.registerCommand("bank", "bank :]", async (msg, actor, command, args) => {
    const response = await forceShow(actor, mainUi(), 1000);
});
