const syncStorage = (() => {

    const syncLocalStorage = (state) => {
        console.log('Chrome: ', chrome);
        chrome.storage.sync.set({
            state
        }, () => {
            console.log('Data successfully saved into Local Storage');
        });
    };


    const getLocalStorage = (key, cb) => {
        chrome.storage.sync.get([key], function (result) {
            cb(result);
        });
    };

    // Features
    return {
        syncLocalStorage,
        getLocalStorage
    };
})();



module.exports = syncStorage;