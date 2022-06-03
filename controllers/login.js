const login = {
    cadastro: (req,res) => {
        return res.render("cadastro")},
    entrar: (req,res) => {
        return res.render("entrar");
    }
};


module.exports = login;
