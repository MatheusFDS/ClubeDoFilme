
module.exports = function(sequelize, DataType) {
    
    //nome da Model
    let alias = 'Categoria';

    //define colunas
    let cols = {
        id_categoria: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome_categoria: DataType.STRING        
    };

    let config = {
        tableName: 'categorias',
        timestamps: false
    };

    let Categoria = sequelize.define(alias, cols, config);

    Categoria.associate = function(models) {
        Categoria.belongsToMany(models.Filme, {
            as: "filmes",
            through: 'filme_categoria',
            foreignKey: 'id_categoria',
            otherKey: 'id_filme',
            timestamps: false,
        })
    }
    
    return Categoria;
};