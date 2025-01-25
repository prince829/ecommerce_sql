import express from "express";
const router = express.Router();
import swaggerJSDoc from "swagger-jsdoc";
import { serveFiles, setup } from "swagger-ui-express";
import Utils from "./utils.js";

const apiFiles = await Utils._readdir('./app/routes/api')
/* This is for Admin end swiagger API doc */
const optionsAdmin = {
	swaggerDefinition: {
		info: {
			title: "Basic Setup",
			version: '1.0.0',
			description: "Basic Setup" + ' Frontend API Doc',
			contact: {
				email: '',
			},
		},
		schemes: ['https', 'http'],
		host: `localhost:3004`,
		// host: `127.0.0.1:1592`,
		basePath: '/api',
		securityDefinitions: {
			Token: {
				type: 'apiKey',
				description: 'JWT authorization of an API',
				name: 'token',
				in: 'header',
			},
		},
	},

	apis: apiFiles,
};



const swaggerSpec = swaggerJSDoc(optionsAdmin);

router.get('/apidoc-json', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	res.send(swaggerSpec);
});

router.use('/apidoc', serveFiles(swaggerSpec), setup(swaggerSpec));

export default router;
