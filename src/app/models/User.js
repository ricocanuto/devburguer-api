import { Sequelize, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

class User extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: Sequelize.UUID,
                defaultValue: uuidv4, // Gerar automaticamente um UUID
                allowNull: false,
                primaryKey: true,
            },
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password_hash: Sequelize.STRING,
            admin: Sequelize.BOOLEAN,
        },
        {
            sequelize,
        },    
        );
    }
}

export default User;
