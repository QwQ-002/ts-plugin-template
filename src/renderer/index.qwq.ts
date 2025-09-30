import packageJson from "package.json";
import { initSettingView } from "@/renderer/pages/settings";
import { main } from "@/renderer/index";

main();

RendererEvents.onSettingsWindowCreated(async () => {
  const view = await PluginSettings.renderer.registerPluginSettings(packageJson);
  initSettingView(view);
});
