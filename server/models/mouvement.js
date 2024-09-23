const modelMouvementStock = (sequelize, DataTypes) => {
    const MouvementStock = sequelize.define("mouvement_stock", {
        itemId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'articles',
                key: 'id' 
            }
         },
         numArticle: {
            type: DataTypes.STRING,

        },
        typeMouvement: {
            type: DataTypes.STRING,

        },
        quantite: {
            type: DataTypes.INTEGER,
        },
        dateMouvement: {
            type: DataTypes.DATE,
        },
        typeArticle: {
            type: DataTypes.STRING,
        },
        design: {
            type: DataTypes.STRING,
        },
        unite: {
            type: DataTypes.STRING,
        },
        fournisseur: {
            type: DataTypes.STRING,
  
        },
        detenteur: {
            type: DataTypes.STRING,
        },
        beneficiaire: {
            type: DataTypes.STRING
        },
        piece: {
            type: DataTypes.STRING,
        },  
    });

    return MouvementStock;
};
export default modelMouvementStock;
