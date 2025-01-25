export interface ServerConfig {
    port: any,
    mode: string,
    jwtSecret: string,
    cookieSeceret: string,
    project_name: string,
    admin_url: string,
    node_env:string,
    jwt_expiresin:string
};
export interface DBInterface {
    host: string,
    port: string,
    database: string,
    userName: string,
    password: string
};
export interface EmailInterface {
    userName: string,
    password: string
}; export interface CipherInterface {
    key_phrase: string,
    iv_phrase: string
}