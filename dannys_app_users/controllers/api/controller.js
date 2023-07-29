const UserSymbol = require('../../models/mysql/user-symbol');

const distincetSymbols = async (req, res, next) => {
    const userSymbol = new UserSymbol(req.pool);
    const symbols = await userSymbol.getSymbolsList();
    return res.json(symbols);
}

module.exports = {
    distincetSymbols,
}