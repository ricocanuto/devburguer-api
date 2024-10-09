import Sequelize, { Model } from "sequelize";
class Category extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
            },
            {
                sequelize,
            },
        );
    
        return this;
    }
     // Define a associação com o modelo Product
     static associate(models) {
        this.hasMany(models.Product, {
            foreignKey: 'category_id',
            as: 'products',
        });
    }
}

export default Category;