const allResourceTypes = Object.values(
  chrome.declarativeNetRequest.ResourceType
);

export default [
  {
    id: 1,
    priority: 1,
    action: {
      type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
      requestHeaders: [
        {
          operation: chrome.declarativeNetRequest.HeaderOperation.SET,
          header: "User-Agent",
          value:
            "Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1",
        },
      ],
    },
    condition: {
      regexFilter: "^http(s)?:\\/\\/(.*\\.)*dcinside\\.com.*$",
      resourceTypes: allResourceTypes,
    },
  },
] satisfies chrome.declarativeNetRequest.Rule[];
