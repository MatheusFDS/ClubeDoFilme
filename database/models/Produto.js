
module.exports = function(sequelize, DataType) {
    
    //nome da Model
    let alias = 'Produto';

    //define colunas
    let cols = {
        id_produto: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome_produto: DataType.STRING,
        meses: DataType.INTEGER,
        valor: DataType.FLOAT,
    }

    let config = {
        tableName: 'produtos',
        timestamps: false
    };

    let Produto = sequelize.define(alias, cols, config);
  
    // Filme.associate = function(models) {
    //     Filme.belongsToMany(models.Categoria, {
    //         as: "categorias",
    //         through: 'filme_categoria',
    //         foreignKey: 'id_filme',
    //         otherKey: 'id_categoria',
    //         timestamps: false,
    //     });
    // };

    return Produto;
};