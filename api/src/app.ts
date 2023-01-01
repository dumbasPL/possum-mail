import express, {json, Request, Response, urlencoded} from 'express';
import {RegisterRoutes} from '../build/routes';
import swaggerUi from 'swagger-ui-express';
import {errorHandler} from './lib/errorHandler';
import {getI18nMiddleware} from './i18n';
import {createServer} from 'http';
import logger from './logger';
import {HTTP_PORT} from './env';
import {formatServerAddress} from './util/ip';

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

export function createHttpServer() {
  const server = createServer(app);

  logger.debug(`Starting express server on port ${HTTP_PORT}`);
  server.listen(HTTP_PORT, () => logger.info(`Server listening on http://${formatServerAddress(server)}`));

  return server;
}

export default app;
