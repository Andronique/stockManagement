const modelArticle = (sequelize, DataTypes) => {
    const Article = sequelize.define("article", 
    {
        numArticle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        design: {
            type: DataTypes.STRING,
            allowNull: false
        },
        obs: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        quantite: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fournisseur: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dateAquisition: {
            type: DataTypes.DATE,
            allowNull: false
        },
        typeArticle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        piece: {
            type: DataTypes.STRING,
        },
    });
    return Article;
};

export default modelArticle;
