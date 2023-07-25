const SymbolValue = require('../../models/mongo/symbol-value');
const UserSymbol = require('../../models/mysql/user-symbol');

const addSymbol = async (req, res, next) => {
    try {
        const userSymbol = new UserSymbol(req.pool);
        await userSymbol.create({
            userId: req.user.id,
            symbol: req.body.symbol 
        });
        res.redirect('/dashboard');
        //res.send('user symbol added');
    } catch (err) {
        next(err);
    } 
};

const dashboard = async (req, res, next) => {
    try {
        const userSymbol = new UserSymbol(req.pool);
        let userName = req.query.username;
        if (userName===null || userName===undefined) {
            userName = "dannys";
        }
        const userSymbols = await userSymbol.getForUser({userId: req.user.id});

        const promises = userSymbols.map((userSymbol) => SymbolValue.findOne({symbol: userSymbol.symbol}).sort({when: -1}).limit(1));
        const symbolValues = await Promise.all(promises);
        
        res.render('dashboard', {
            username: req.user?.id,
            userSymbols,
            symbolValues
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    addSymbol,
    dashboard
};
