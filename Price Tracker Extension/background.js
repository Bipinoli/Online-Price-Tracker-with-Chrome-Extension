let activeTab;


// when the browser action is clicked
chrome.browserAction.onClicked.addListener(function (tab) {

    // send a message to the active tab
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "browser-action-btn-clicked", "url": activeTab.url, "tabs": tabs});
    });
});


chrome.runtime.onMessage.addListener(
    function (req, sender, sendResponse) {

        function formatAMPM(date) {
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0'+minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;
            return strTime;
        }
          

        if (req.message === "track-price") {

            let date = new Date();
            let month = date.toLocaleString('default', { month: 'short' });
            let day = date.getDate();
            let year = date.getFullYear();
            let formattedTime = formatAMPM(date);
            let url = new URL(activeTab.url);
            let domain = url.hostname;

            let payload = {
                sourceUrl: encodeURIComponent(activeTab.url),
                domPath: req.path,
                name: "Name Here",
                currentDate: day + " " + month + " " + year,
                domain: domain,
                currentTime: formattedTime,
                currentPrice: req.selectedValue,
            };

            postPriceDetails(payload);
        }
    }
);


function postPriceDetails(payload) {

    let jsonPayload = JSON.stringify(payload);

    const Http = new XMLHttpRequest();
    const url = "http://localhost/PHP_backend/saveToSharedMemory.php";
    Http.open("POST", url, true);
    Http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    // Http.send("data=" + foo + "&bar=" + bar);
    Http.send("data=" + jsonPayload);

    // send a log message to the active tab
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        let activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "background-log", "log": jsonPayload});
    });

    // when the request is success
    Http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            
            
            // send a log message to the active tab
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                let activeTab = tabs[0];
                chrome.tabs.sendMessage(activeTab.id, {"message": "background-log", "log": Http.responseText});
            });
        }
    }
}