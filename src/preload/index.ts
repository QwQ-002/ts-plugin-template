import { contextBridge } from "electron";

const exposeFunctions = {};

contextBridge.exposeInMainWorld("ts_plugin_template", exposeFunctions);

export type TsPluginTemplate = typeof exposeFunctions;
