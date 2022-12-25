import {Server} from 'http';

export function formatServerAddress(server: Server) {
  const address = server.address();
  if (address == null) {
    return 'NULL';
  }

  if (typeof address == 'string') {
    return address;
  }

  return `${address.family == 'IPv6' ? `[${address.address}]`: address.address}:${address.port}`;
}
