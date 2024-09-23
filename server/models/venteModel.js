const modelVente = (sequelize , DataTypes)=>{
    const Product = sequelize.define("vente" , 
    {
        numProduit:{
            type: DataTypes.STRING,
            allowNull: false
        },
        design: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER
        },
        quantity: {
            type: DataTypes.INTEGER
        },
    });

    return Product
}
export default modelVente


