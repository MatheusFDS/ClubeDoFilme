const userController = {
    register: (req, res) =>{
        res.render('userRegisterForm');
    },
    processRegister: (req, res) => {        
        console.log(req.body);
        res.send(req.body)
    },
    login: (req, res) => {
        res.render('userLoginForm');
    },
    loginProcess: (req, res) => {
        res.send(req.body)
    },    
}

module.exports = userController;