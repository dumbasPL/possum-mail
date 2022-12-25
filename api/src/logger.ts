
import {Logger} from 'tslog';

const logger = new Logger({
  minLevel: 2, // 0: silly, 1: trace, 2: debug, 3: info, 4: warn, 5: error, 6: fatal
});

logger.debug('Logger initialized');

export default logger;
