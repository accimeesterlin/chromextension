
const statusHandler = (() => {

    const error = (err, req, res, next) => {
        res.status(err.statusCode).json(err);
    };
    // Features
    return {
        error
    };
})();

module.exports = statusHandler;