import { world } from "@minecraft/server";
import "./commands";
import { loadData } from "./src/data-handler/data";


world.afterEvents.worldInitialize.subscribe(() => {
    loadData();
});
