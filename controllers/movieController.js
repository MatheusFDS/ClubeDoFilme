const movieController = {
    movieList: (req, res) => {
        res.render('movieList');
    },
    movieDetail: (req, res) => {
        res.render('movieDetail');
    },
    movieDetail2: (req, res) => {
        res.render('movieDetail2');
    }
};

module.exports = movieController;