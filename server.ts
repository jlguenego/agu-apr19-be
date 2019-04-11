import * as express from 'express';
import * as serveIndex from 'serve-index';

const app = express();

app.use(function (req, res, next) {
    console.log('req.url', req.url);
    next();
});

const root = '../exo/dist/exo';
app.use(express.static(root));
app.use(serveIndex(root, {
    icons: true
}));

app.use(function (req, res, next) {
    console.log('404: Page not Found', req.url);
    next();
});

const port = 8000;
app.listen(port, function () {
    console.log('server started on port ' + port);
});