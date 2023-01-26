import {AddressInfo} from 'net';

export function formatServerAddress(address: AddressInfo | string | null) {
  if (address == null) {
    return 'NULL';
  }

  if (typeof address == 'string') {
    return address;
  }

  return `${address.family == 'IPv6' ? `[${address.address}]`: address.address}:${address.port}`;
}
