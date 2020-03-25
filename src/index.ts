const ROUTE_CHARS = /^[a-zA-Z0-9-_]+$/;
interface StringMap { [key: string]: string };

export function injectUriParameters(uri: string, params: StringMap, encode: boolean = true): string {
    const paramPos = indexParameters(splitPath(uri));
    return injectParameters(uri, params, paramPos, encode);
}

function assert(condition: boolean, msg: string) {
    if (!condition) {
        throw new Error('Path Builder Assertion Failed: ' + msg);
    }
}

function splitPath(path: string): string[] {
    return path === '' ? [] : path.split('/');
}

function indexParameters(pathElements: ReadonlyArray<string>): ReadonlyMap<string, number> {
    return pathElements.reduce((p, c, i) => {
        if (c[0] === ':') {
            p.set(c.substr(1), i);
        }
        return p;
    }, new Map<string, number>());
}

function injectParameters(path: string, params: StringMap, parameterPositions: ReadonlyMap<string, number>, encode: boolean): string {
    const pathItems: string[] = splitPath(path);
    const queryItems: string[] = [];
    // replace path items and push queries
    Object.entries(params).forEach(([key, value]: [string, string]) => {
        const injectValue = encode ? encodeURIComponent(value) : value;
        const pos = parameterPositions.get(key);
        if (pos != null) {
            pathItems[pos] = injectValue;
        } else {
            assert(ROUTE_CHARS.test(key), "Non-route parameters must use only the following characters: A-Z, a-z, 0-9, -, _");
            queryItems.push(key + '=' + injectValue);
        }
    });
    // uri
    return pathItems.join("/") + (queryItems.length === 0 ? '' : '?' + queryItems.join('&'));
}


