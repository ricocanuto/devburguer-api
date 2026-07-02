import Sequelize, { Model } from 'sequelize';
class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
          const baseUrl = process.env.APP_URL || 'http://localhost:3001';
          return `${baseUrl}/category-file/${this.path}`;
    },
        },
        },
      
      {
        sequelize,
        tableName: 'categories',
        underscored: true,
      },
    );

    return this;
  }
 
  static associate(models) {
    this.hasMany(models.Product, {
      foreignKey: 'category_id',
      as: 'products',
    });
  }
}

export default Category;
