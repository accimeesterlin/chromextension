console.log('Chrome: ', chrome);

chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({
        color: '#3aa757'
    }, function () {
        console.log('The color is green');
    });

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {
                    hostEquals: 'developer.chrome.com'
                }
            })],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});



// Chrome Storage API
// onInstalled Event
// Chrome Runtime 
// Sync Storage
// Set values in the local storage