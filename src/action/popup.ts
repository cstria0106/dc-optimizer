window.addEventListener("DOMContentLoaded", () => {
  const enable = document.querySelector<HTMLInputElement>("#enable");

  chrome.storage.local.get("enable", (data) => {
    enable.checked = data.enable ?? true;
  });

  enable.addEventListener("change", async (e) => {
    const checked = enable.checked;
    await chrome.storage.local.set({ enable: checked });
  });
});
