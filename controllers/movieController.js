const movieController = {
    movieList: (req, res) => {
        res.render('movieList');
    },
    movieDetail: (req, res) => {
        res.render('movieDetail');
    },    
};

module.exports = movieController;