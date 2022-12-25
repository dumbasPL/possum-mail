import express, {json, Request, Response, urlencoded} from 'express';
import {RegisterRoutes} from '../build/routes';
import swaggerUi from 'swagger-ui-express';
import {errorHandler} from './lib/errorHandler';
import {getI18nMiddleware} from './i18n';

const app = express();

app.use(urlencoded({extended: true}));
app.use(json());

app.use('/api/v1/docs', swaggerUi.serve, async (_req: Request, res: Response) => {
  return res.send(
    swaggerUi.generateHTML(await import('../build/swagger.json'))
  );
});

app.use(getI18nMiddleware());

RegisterRoutes(app);

app.use(errorHandler);

export default app;
