
module.exports = function(sequelize, DataType) {
    
    //nome da Model
    let alias = 'Usuario';

    //define colunas
    let cols = {
        id_matricula: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome_completo: DataType.STRING,
        email: DataType.STRING,
        data_cadastro: DataType.DATE,
        id_assinatura: DataType.INTEGER,
        avatar: DataType.STRING,
        senha: DataType.STRING
    }

    let config = {
        tableName: 'usuarios',
        timestamps: false
    };

    let Usuario = sequelize.define(alias, cols, config);
  
    // Filme.associate = function(models) {
    //     Filme.belongsToMany(models.Categoria, {
    //         as: "categorias",
    //         through: 'filme_categoria',
    //         foreignKey: 'id_filme',
    //         otherKey: 'id_categoria',
    //         timestamps: false,
    //     });
    // };

    return Usuario;
};