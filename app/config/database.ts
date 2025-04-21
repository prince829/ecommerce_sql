
import { Sequelize } from 'sequelize-typescript';
import Role from '../modules/roles/models/Role.model.js';
import User from '../modules/users/models/User.model.js';

export default async () => {
    const sequelize = new Sequelize({
        username: 'prince',
        password: 'Kumar@2182',
        database: 'postgres',
        host: 'localhost',
        dialect: 'postgres', // Using PostgreSQL
        models: [Role,User], // Add other models here
        logging:false
    });

    try {
        await sequelize.authenticate();
        globalThis.sequelize=sequelize;
        console.log('DB connected successfully');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    return sequelize;
}