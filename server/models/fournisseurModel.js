const modelFournisseur = (sequelize, DataTypes) => {
    const Destinateur = sequelize.define("fournisseur", {
        nom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        departement: {
            type: DataTypes.STRING,
            allowNull: true
        },
        contact: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    return Destinateur;
};
export default modelFournisseur;