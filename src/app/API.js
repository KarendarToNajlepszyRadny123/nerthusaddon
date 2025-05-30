import {
  addToMapChangelist,
  applyCurrentMapChange,
  removeFromMapChangelist,
} from "./maps";
import { turnLightsOn } from "./night/lights";
import { applyCurrentNight, changeLight } from "./night/night";
import { customNpcs, loadNpcsFromFile } from "./npc/npc";
import { addNpc, addNpcToList } from "./npc/npc-actions/add";
import { hideGameNpc } from "./npc/npc-actions/hide";
import { checkPermissionLvl, hasNarrationRights } from "./permissions";
import { getWeather } from "./weather/weather";

/*
 Event names:
 - displayWeather
 - addTemporaryNpc
 - removeTemporaryNpc
 - loaded
 */
const callbacks = {};

export function callEvent(eventName, data) {
  for (const callback in callbacks[eventName]) {
    callbacks[eventName][callback](data);
  }
}

export function initAPI() {
  window.nerthus = {
    loaded: false,
    addCallbackToEvent(eventName, func) {
      if (!callbacks[eventName]) callbacks[eventName] = [];
      callbacks[eventName].push(func);
    },
    permissions: {
      checkPermissionLvl,
      hasNarrationRights,
    },
    weather: {
      getWeather,
    },
    night: {
      changeLight,
      applyCurrentNight,
      turnLightsOn,
    },
    npcList: customNpcs,
    npc: {
      npcList: customNpcs,
      addNpc,
      addNpcToList,
      hideGameNpc,
      loadNpcsFromFile,
    },
    map: {
      addToMapChangelist,
      removeFromMapChangelist,
      applyCurrentMapChange,
    },
  };
  window.nerthus.addCallbackToEvent("loaded", function () {
    window.nerthus.loaded = true;
  });
}

/*
  If something is missing in the API and you would want to use it,
  feel free to open an issue
 */
