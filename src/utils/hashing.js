const bcrypt = require("bcryptjs");


const generateHashed = async (payload, saltV = 10) => {
    // generate salt
    const salt = await bcrypt.genSalt(saltV);
    return await bcrypt.hash(payload,salt);
};

const hashedMatch = async (raw,hash) => {
    const matched = await bcrypt.compare(raw,hash);
    return matched;
};

module.exports = {
    generateHashed,
    hashedMatch
}