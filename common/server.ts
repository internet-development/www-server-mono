import * as Utilities from '@common/utilities';

export async function setup(context): Promise<{ sessionKey?: any; viewer?: Record<string, any> | null }> {
  let viewer = null;
  let sessionKey = context.req.cookies['sitekey'] || '';

  if (!Utilities.isEmpty(sessionKey)) {
    try {
      const response = await fetch('https://api.internet.dev/api/users/viewer', {
        method: 'PUT',
        headers: { 'X-API-KEY': sessionKey, 'Content-Type': 'application/json' },
      });
      const result = await response.json();
      if (result && result.viewer) {
        viewer = result.viewer;
      }
    } catch (e) {}
  }

  return { sessionKey, viewer };
}

export async function tryKeyWithoutCookie(key): Promise<{ sessionKey?: any; viewer?: Record<string, any> | null }> {
  let viewer = null;

  if (!Utilities.isEmpty(key)) {
    try {
      const response = await fetch('https://api.internet.dev/api/users/viewer', {
        method: 'PUT',
        headers: { 'X-API-KEY': key, 'Content-Type': 'application/json' },
      });
      const result = await response.json();
      if (result && result.viewer) {
        viewer = result.viewer;
      }
    } catch (e) {}
  }

  return { sessionKey: key, viewer };
}
