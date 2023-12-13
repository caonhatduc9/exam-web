import { DataSource } from "typeorm"

export const myDataSource = new DataSource({
    type: 'mysql',
    host: 'db-mysql-sgp1-95439-do-user-13533061-0.b.db.ondigitalocean.com',
    port: 25060,
    username: 'duccao',
    password: 'AVNS_0DlAkoOltYDWD0wPDzX',
    database: 'web_advanced',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: ['src/migrations/*.ts', 'dist/migrations/*{.ts,.js}'],
    synchronize: false,
})
