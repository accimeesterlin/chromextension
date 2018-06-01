const syncStorage = (() => {

    const syncLocalStorage = (data) => {
        chrome.storage.sync.set({
            students: data
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