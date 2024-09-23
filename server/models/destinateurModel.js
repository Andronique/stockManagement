const modelDestinateur = (sequelize, DataTypes) => {
    const Destinateur = sequelize.define("destinateur", {
        nom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        departement: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    return Destinateur;
};
export default modelDestinateur;
