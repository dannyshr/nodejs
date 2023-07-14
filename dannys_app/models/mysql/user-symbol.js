class UserSymbol {

    constructor (pool) {
        this.pool = pool;
    }

    create ({userId, symbol}) {
        return this.pool.execute(`
            insert into users_symbols (user_id, symbol)
            values (?, ?)
        `, [
            userId,
            symbol,
        ]);
    }

    getForUser({userId}) {
        return this.pool.execute(`
            select distinct * from users_symbols 
            where user_id = ?
        `, [
            userId,
        ]);
    }

    update({id, userId, symbol}) {

    }

    delete({id}) {
        
    }
}

module.exports = UserSymbol;