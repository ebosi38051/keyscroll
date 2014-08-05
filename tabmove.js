chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    var index = sender.tab.index;
    chrome.tabs.getAllInWindow(function(tabs) {
      if (request.tabmove === "prev") {
        index = (index > 0 ? index - 1 : tabs.length - 1);
      }
      if (request.tabmove === "next") {
        index = (index < tabs.length - 1 ? index + 1 : 0);
      }
      chrome.tabs.update(tabs[index].id, {selected: true});
    })
    sendResponse({});
  }
);
