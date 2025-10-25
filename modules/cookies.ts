// NOTE(jimmylee)
// Rewritten from `js-cookie` for Typescript 5.7.2

interface CookieAttributes {
  expires?: number | Date | string;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  [key: string]: any;
}

interface CookieConverter {
  read: (value: string, name: string) => string;
  write: (value: string, name: string) => string;
}

interface CookiesAPI {
  set: (name: string, value: string, attributes?: CookieAttributes) => string | undefined;
  get: (name?: string) => string | { [key: string]: string } | undefined;
  remove: (name: string, attributes?: CookieAttributes) => void;
  withAttributes: (attributes: CookieAttributes) => CookiesAPI;
  withConverter: (converter: Partial<CookieConverter>) => CookiesAPI;
}

export function assign(target: any, ...sources: any[]): any {
  for (let i = 0; i < sources.length; i++) {
    const source = sources[i];
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
}

const defaultConverter: CookieConverter = {
  read: function (value: string): string {
    if (value[0] === '"') {
      value = value.slice(1, -1);
    }
    return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
  },
  write: function (value: string): string {
    return encodeURIComponent(value).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent);
  },
};

function init(converter: CookieConverter, defaultAttributes: CookieAttributes): CookiesAPI {
  function set(name: string, value: string, attributes?: CookieAttributes): string | undefined {
    if (typeof document === 'undefined') {
      return;
    }

    const attrs = assign({}, defaultAttributes, attributes || {});

    if (typeof attrs.expires === 'number') {
      attrs.expires = new Date(Date.now() + attrs.expires * 864e5);
    }
    if (attrs.expires) {
      attrs.expires = (attrs.expires as Date).toUTCString();
    }

    name = encodeURIComponent(name)
      .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
      .replace(/[()]/g, encodeURIComponent);

    let stringifiedAttributes = '';
    for (const attributeName in attrs) {
      if (!attrs[attributeName]) {
        continue;
      }

      stringifiedAttributes += '; ' + attributeName;

      if (attrs[attributeName] === true) {
        continue;
      }

      stringifiedAttributes += '=' + (attrs[attributeName] as string).split(';')[0];
    }

    return (document.cookie = name + '=' + converter.write(value, name) + stringifiedAttributes);
  }

  function get(name?: string): string | { [key: string]: string } | undefined {
    if (typeof document === 'undefined' || (arguments.length && !name)) {
      return;
    }

    const cookies = document.cookie ? document.cookie.split('; ') : [];
    const jar: { [key: string]: string } = {};

    for (let i = 0; i < cookies.length; i++) {
      const parts = cookies[i].split('=');
      const value = parts.slice(1).join('=');

      try {
        const found = decodeURIComponent(parts[0]);
        if (!(found in jar)) {
          jar[found] = converter.read(value, found);
        }
        if (name === found) {
          break;
        }
      } catch (e) {
        if (typeof console !== 'undefined' && console.warn) {
          console.warn(`Failed to decode cookie: ${parts[0]}`, e);
        }
      }
    }

    return name ? jar[name] : jar;
  }

  const api = {
    set,
    get,
    remove: function (name: string, attributes?: CookieAttributes): void {
      set(
        name,
        '',
        assign({}, attributes || {}, {
          expires: -1,
        })
      );
    },
    withAttributes: function (attributes: CookieAttributes): CookiesAPI {
      return init(converter, assign({}, defaultAttributes, attributes));
    },
    withConverter: function (newConverter: Partial<CookieConverter>): CookiesAPI {
      return init(assign({}, converter, newConverter) as CookieConverter, defaultAttributes);
    },
  };

  return api as CookiesAPI;
}

export default init(defaultConverter, { path: '/' });
