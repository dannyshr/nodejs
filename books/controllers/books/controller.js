const axios = require('axios');

const findBooks = async (req, res, next) => {
    let query = req.body.query;
    try {
        const result = await axios(`https://www.googleapis.com/books/v1/volumes?q=intitle:${query}`);
        const data = result.data;
        console.log(data);
        
        res.render('home', {
            books: data
        });
    } 
    catch (err) {
        next(err);
    } 
};

const fetchBooks = async (req, res, next) => {
    let query = req.body.query;
    if (query==null) {
        res.render('home', {
            books: []
        });
    }
    else {
        try {
            const result = await axios(`https://www.googleapis.com/books/v1/volumes?q=intitle:${query}`);
            const data = result.data;
            console.log(data);
            
            res.render('home', {
                books: data
            });
        } 
        catch (err) {
            next(err);
        } 
    }
}

module.exports = {
    findBooks,
    fetchBooks
};
