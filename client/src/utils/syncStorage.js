const syncStorage = (() => {

    const syncLocalStorage = (data) => {
        try {
            chrome.storage.sync.set({
                students: data
            }, () => {
                console.log('Data successfully saved into Local Storage');
            });
        } catch (error) {

        }
    };


    const getLocalStorage = (key, cb) => {
        try {
            chrome.storage.sync.get([key], function (result) {
                cb(result);
            });
        } catch (error) {

        }
    };

    // Features
    return {
        syncLocalStorage,
        getLocalStorage
    };
})();



module.exports = syncStorage;