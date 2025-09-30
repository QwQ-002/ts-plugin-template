async function initSettingView(view: HTMLDivElement) {
  const devInfo: HTMLDivElement = document.createElement("div");
  devInfo.innerHTML = `Hello World!`;
  view.insertAdjacentElement("afterbegin", devInfo);
}

export { initSettingView };
