import mitt from 'mitt';
import createSubscriber from 'pg-listen';
import {DATABASE_URI} from './env';

const PgEvents = ['config_updated'] as const;

export const pgSubscriber = createSubscriber<Record<typeof PgEvents[number], string>>({connectionString: DATABASE_URI});

const eventBuss = mitt<{
  initialized: void,
  configUpdated: void,
}>();

pgSubscriber.notifications.on('config_updated', () => eventBuss.emit('configUpdated'));

export async function initEventBuss() {
  await pgSubscriber.connect();
  await Promise.all(PgEvents.map(async event => await pgSubscriber.listenTo(event)));
}

export default eventBuss;
