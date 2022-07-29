
module.exports = function(sequelize, DataType) {
    
    //nome da Model
    let alias = 'UsuarioFilmeLista';

    //define colunas
    let cols = {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_filme: DataType.INTEGER,
        id_matricula: DataType.INTEGER,        
    }

    let config = {
        tableName: 'usuario_filme_lista',
        timestamps: false
    };

    let UsuarioFilmeLista = sequelize.define(alias, cols, config);
  
    // Filme.associate = function(models) {
    //     Filme.belongsToMany(models.Categoria, {
    //         as: "categorias",
    //         through: 'filme_categoria',
    //         foreignKey: 'id_filme',
    //         otherKey: 'id_categoria',
    //         timestamps: false,
    //     });
    // };

    return UsuarioFilmeLista;
};