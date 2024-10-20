//  const dBconfig = {
//     HOST: 'localhost',
//     USER: 'root',
//     PASSWORD: '',
//     DB:'stockmanagement',
//     dialect: 'mysql'
// }
// export default dBconfig;

import { Sequelize } from "sequelize";

const db = new Sequelize('stockmanagement' , 'root', '' , {
    host : 'localhost',
    dialect:'mysql'  
})

export default db;