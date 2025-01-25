import { CipherInterface, DBInterface, EmailInterface, ServerConfig } from "../interface/ConfigInterface.js";

const config = {
    server: <ServerConfig>{
        port: process.env['PORT'],
        mode: process.env['MODE'],
        jwtSecret: "testbasicauth@13#",
        cookieSeceret: "FastifySeceret@!#45&manddfgassTestBasic@123rghdfgasds",
        project_name: process.env['PROJECT_NAME'],
        admin_url: process.env['ADMIN_URL'],
        node_env:process.env['NODE_ENV'],
        jwt_expiresin:"7d"
    },
    DB: <DBInterface>{
        host: process.env['DB_HOST'],
        port: process.env['DB_PORT'],
        database: process.env['DB_DATABASE'],
        userName: process.env['DB_USERNAME'],
        password: process.env['DB_PASSWORD']
    },
    email: <EmailInterface>{
        userName: process.env['MAIL_USERNAME'],
        password: process.env['MAIL_PASSWORD']
    },
    cipher: <CipherInterface>{
        key_phrase: process.env['KEY_PHRASE'],
        iv_phrase: process.env['IV_PHRASE']
    }

};
export { config }