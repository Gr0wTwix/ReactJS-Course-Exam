const shoes = require('../services/shoes');

function init() {
    return (req, res, next) => {
        const storage = Object.assign({}, shoes);
        req.storage = storage;
        next();
    };
}

module.exports = init;