import { User } from '../models/index.js';
export const seedUsers = async () => {
    await User.bulkCreate([
        { username: 'JollyGuru', password: 'password' }, // email: 'jolly@guru.com', 
        {
            username: 'SunnyScribe',
            //        email: 'sunny@scribe.com',
            password: 'password',
        },
        {
            username: 'RadiantComet',
            //        email: 'radiant@comet.com',
            password: 'password',
        },
    ], { individualHooks: true });
};
