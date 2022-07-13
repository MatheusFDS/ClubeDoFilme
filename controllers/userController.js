const userController = {
    register: (req, res) =>{
        res.render('userRegisterForm');
    },
    login: (req, res) => {
        res.render('userLoginForm');
    },    
}

module.exports = userController;