import {randomUUID} from 'crypto';

/**
 * Generates fake ranom message id
 * @param domain the domain name to use, defaults to "possum-mail"
 */
export function generateFakeMessageId(domain?: string): string {
  return `<possum-fake-id-${Date.now()}-${randomUUID()}@${domain ?? 'possum-mail'}>`;
}

/**
 * Extracts everything after the `@` symbol
 * @param address email address
 */
export function getEmailDomain(address: string): string | null {
  const atIndex = address.indexOf('@');
  if (atIndex == -1) {
    return null;
  }
  return address.slice(atIndex + 1).toLowerCase();
}
