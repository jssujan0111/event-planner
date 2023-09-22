const createGuest = require('./createGuest');
const deleteGuest = require('./deleteGuest');
const updateGuest = require('./updateGuest');
const findSingleGuest = require('./findSingleGuest');
const findAllGuest = require('./findAllGuest');
const count = require('./count')

module.exports = {
    createGuest,
    deleteGuest,
    updateGuest,
    findSingleGuest,
    findAllGuest,
    count
};