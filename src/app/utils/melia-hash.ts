import MD5 from 'crypto-js/md5';

export function meliaHash(password: string): string {
  return MD5(password).toString().toUpperCase();
}