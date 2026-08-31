import midtransClient from 'midtrans-client';
import { env } from '$env/dynamic/private';

const isProduction = env.MIDTRANS_IS_PRODUCTION === 'true';

export const snap = new midtransClient.Snap({
  isProduction: isProduction,
  serverKey: env.MIDTRANS_SERVER_KEY || '',
  clientKey: env.MIDTRANS_CLIENT_KEY || ''
});

export const coreApi = new midtransClient.CoreApi({
  isProduction: isProduction,
  serverKey: env.MIDTRANS_SERVER_KEY || '',
  clientKey: env.MIDTRANS_CLIENT_KEY || ''
});
