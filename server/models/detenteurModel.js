const modelDetenteur = (sequelize, DataTypes) => {
    const Detenteur = sequelize.define("detenteurs", {
        detenteur: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
    });

    return Detenteur;
};
export default modelDetenteur;