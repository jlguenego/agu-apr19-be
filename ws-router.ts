import * as express from 'express';
import {Rest} from './rest';

const rest = new Rest();
const app = express.Router();
export const wsRouter = app;

app.use((req, res, next) => {
	console.log('ws call', req.url);
	next();
});

app.use((req, res, next) => {
    setTimeout(() => {
        next();
    }, 1000);
});



const resources = ['cats'];

resources.forEach((resource) => {
	app.use(`/${resource}`, rest.resource(resource));
});

app.use('/not-well-working', (req, res, next) => {
	if (Math.random() < 0.5) {
		res.sendStatus(500);
		return;
	}
	res.json({
		content: 'ok'
	});
});

app.use('/needs-authorization-header', (req, res) => {
	if (!req.headers.authorization) {
		return res.status(403).json({
			error: 'No credentials sent!'
		});
	}
	res.json({
		content: 'needs-authorization-header ok'
	});
});