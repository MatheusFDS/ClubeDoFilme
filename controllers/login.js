const login = {
    cadastro: (req,res) => {
        return res.render("cadastro")},
    entrar: (req,res) => {
        return res.render("entrar")},
    criarCadastro: (req,res) => {
      return res.redirect("/")}
};

module.exports = login;
