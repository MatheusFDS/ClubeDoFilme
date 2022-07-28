
module.exports = function(sequelize, DataType) {
    
    //nome da Model
    let alias = 'Pedido';

    //define colunas
    let cols = {
        id_pedido: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },        
        valor_pago: DataType.FLOAT,
        dt_inic_assinatura: DataType.DATE,
        dt_fim_assinatura: DataType.DATE,
        id_matricula: DataType.INTEGER,
        id_produto: DataType.INTEGER,
    }

    let config = {
        tableName: 'pedidos',
        timestamps: false
    };

    let Pedido = sequelize.define(alias, cols, config);
  
    // Pedido.associate = function(models) {
    //     Filme.belongsToMany(models.Categoria, {
    //         as: "categorias",
    //         through: 'filme_categoria',
    //         foreignKey: 'id_filme',
    //         otherKey: 'id_categoria',
    //         timestamps: false,
    //     });
    // };

    return Pedido;
};