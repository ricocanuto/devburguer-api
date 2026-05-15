export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('users', 'street', { type: Sequelize.STRING });
  await queryInterface.addColumn('users', 'number', { type: Sequelize.STRING });
  await queryInterface.addColumn('users', 'neighborhood', { type: Sequelize.STRING });
  await queryInterface.addColumn('users', 'city', { type: Sequelize.STRING });
  await queryInterface.addColumn('users', 'state', { type: Sequelize.STRING });
  await queryInterface.addColumn('users', 'zip_code', { type: Sequelize.STRING });
}

export async function down(queryInterface) {
  await queryInterface.removeColumn('users', 'street');
  await queryInterface.removeColumn('users', 'number');
  await queryInterface.removeColumn('users', 'neighborhood');
  await queryInterface.removeColumn('users', 'city');
  await queryInterface.removeColumn('users', 'state');
  await queryInterface.removeColumn('users', 'zip_code');
}