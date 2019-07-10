
// when the browser action is clicked
chrome.browserAction.onClicked.addListener(function (tab) {

    // send a message to the active tab
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        let activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "browser-action-btn-clicked", "url": activeTab.url, "tabs": tabs});
    });
});


chrome.runtime.onMessage.addListener(
    function (req, sender, sendResponse) {
        if (req.message === "open-youtube") {
            chrome.tabs.create({"url": "https://youtube.com"});
        }
    }
);