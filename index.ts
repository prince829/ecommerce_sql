import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import 'dotenv/config'
import { join, resolve, dirname } from 'node:path'
import { config } from "./app/config/config.js";
import { fileURLToPath, pathToFileURL } from 'url';
import cookieParser from "cookie-parser";
import Utils from "./app/helper/utils.js";
import * as authMiddleware from './app/middlewares/auth.js'
import path from "path";
import flash from 'connect-flash';
import session from "cookie-session";
import moment from 'moment';
import customEjsRenderer from "./app/middlewares/renderWithLayout.js";
import { RoleRepository } from "./app/modules/roles/repository/Role.repository.js";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

const getPort = config.server.port;

/********* Functions + variable declaration start*********/
globalThis.moment = moment;
/********* Functions + variable declaration end*********/
// custom modules will goes here

// globalThis.auth = authMiddleware.default();

app.use(function (_req: Request, res: Response, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
/******************** Middleware registrations *******************/
app.use(cors());
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
})); // get information from html forms
app.use(bodyParser.json({
    limit: "50mb"
}));
// Define session options

app.use(session({
    name: "session",
    secret: config.server.cookieSeceret,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    keys: ['x-access-token', 'token'],
    secure: false
}));
app.use(flash());
/***************  Swagger API DOC ***************/
const swaggerApi = (await import(resolve(join(__dirname, 'app/helper', config.server.node_env == "production" ? 'swagger.js' : 'swagger')))).default
app.use('/', swaggerApi);
/************************************************/
app.use(express.static('./public'));
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', customEjsRenderer);
app.set("view engine", "ejs");
// app.set('view cache', true);
// app.use(auth.initialize());
app.use(async (req: Request, res: Response, next) => {
    res.locals.user = null;
    res.header('Cache-Control', 'private, no-cache, max-age=3600');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    res.locals.messages = req.flash();
    const authMiddlewarePath = resolve(join(__dirname, 'app/middlewares', config.server.node_env == "production" ? 'auth.js' : 'auth.ts'));
    const authMiddleware = (await import(pathToFileURL(authMiddlewarePath).href)).default;
    authMiddleware(req, res, next);

    // This is for webservice end
    if (req.headers['x-access-token'] != null) {
        req.headers['token'] = req.headers['x-access-token'];
    };
    if (req.session && req.session.token && req.session.token != null) {

        req.headers['token'] = req.session.token;
    };
    // add this line to include winston logging
    next();
});
/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error: any) => {
    const port = getPort;
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(0);
            break;
        default:
            throw error;
    }
};

(async () => {
    try {
        // Database connection//
       let DB= await ((await import(resolve(join(__dirname, 'app/config',config.server.node_env == "production" ?'database.js':'database')))).default)();
        await DB.sync({alter:true}); // This will create tables if they don't exist
        console.log('All models were synchronized successfully.');
        /******************* Routes Api ************/
        const apiFiles = await Utils._readdir('./app/routes/api');

        for (const file of apiFiles) {
            const filePath = join(__dirname, config.server.node_env == "production" ? file.replace('.ts', '.js') : file); // Adjust the join path based on your project structure
            const fileurl = pathToFileURL(filePath);
            const routeModule = await import(fileurl.href);
            // Check if routeModule has a default export that is an Express router
            if (routeModule.default && typeof routeModule.default === 'function') {
                app.use('/api', routeModule.default);
            } else {
                console.error(`Invalid route module: ${file}. It should export a default function (router).`);
            }
        };

        /*********************** Routes Admin **********************/
        const adminFiles = await Utils._readdir('./app/routes/admin');

        for (const file of adminFiles) {
            const filePath = join(__dirname, config.server.node_env == "production" ? file.replace('.ts', '.js') : file); // Adjust the join path based on your project structure
            const fileurl = pathToFileURL(filePath);
            const routeModule = await import(fileurl.href);
            // Check if routeModule has a default export that is an Express router
            if (routeModule.default && typeof routeModule.default === 'function') {
                app.use('', routeModule.default);
            } else {
                console.error(`Invalid route module: ${file}. It should export a default function (router).`);
            }
        };
        /******************* Service Launch *****************/
        app.listen(getPort);
        app.on('error', onError);
        console.log(`${config.server.project_name} is running on 'http://localhost:${getPort}'`);
    } catch (error) {
        console.error(error);
    }
})();
