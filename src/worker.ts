import rules from "./worker/rules.js";

function enable() {
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: rules.map((rule) => rule.id),
    addRules: rules,
  });
}

function disable() {
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: rules.map((rule) => rule.id),
  });
}

chrome.storage.local.get("enable", (data) => {
  if (data.enable) enable();
  else disable();
});

chrome.storage.local.onChanged.addListener((changed) => {
  if (changed.enable.newValue) enable();
  else disable();
});

chrome.cookies.set({
  url: "https://m.dcinside.com",
  domain: ".dcinside.com",
  name: "list_count",
  value: "100",
});
