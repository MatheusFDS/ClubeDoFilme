
module.exports = function(sequelize, DataType) {
    
    //nome da Model
    let alias = 'Filme';

    //define colunas
    let cols = {
        id_filme: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: DataType.STRING,
        sinopse: DataType.STRING,
        avaliacao: DataType.FLOAT,
        ano: DataType.INTEGER,
        faixa_etaria: DataType.INTEGER,
        duracao: DataType.INTEGER,
        direcao: DataType.STRING,
        elenco: DataType.STRING,
        roteiro: DataType.STRING,
        produtora: {
            type: DataType.STRING,
            allowNull: true
        },
        avatar: DataType.STRING,
        rota_filme: DataType.STRING        
    }

    let config = {
        tableName: 'filmes',
        timestamps: false
    };

    let Filme = sequelize.define(alias, cols, config);
  
    Filme.associate = function(models) {
        Filme.belongsToMany(models.Categoria, {
            as: "categorias",
            through: 'filme_categoria',
            foreignKey: 'id_filme',
            otherKey: 'id_categoria',
            timestamps: false,
        });
    };

    return Filme;
};