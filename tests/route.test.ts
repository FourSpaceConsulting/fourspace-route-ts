import { PathBuilder } from '../src';

describe('Test Path Builder', () => {

    test('Build path with leading slash', () => {
        const result = PathBuilder.buildPath('/contacts/:id/name/:name', { id: '3', name: 'test' });
        expect(result).toBe('/contacts/3/name/test');
    });

    test('Build path without leading slash', () => {
        const result = PathBuilder.buildPath('contacts/:id/name/:name', { id: '53', name: 'name' });
        expect(result).toBe('contacts/53/name/name');
    });

    test('Build path with leading param', () => {
        const result = PathBuilder.buildPath(':id/contacts/name/:name', { id: '26', name: 'name' });
        expect(result).toBe('26/contacts/name/name');
    });

    test('Build path with leading param and slash', () => {
        const result = PathBuilder.buildPath('/:id/contacts/name/:name', { id: '26', name: 'name' });
        expect(result).toBe('/26/contacts/name/name');
    });

    test('Build path with one query', () => {
        const result = PathBuilder.buildPath('/contacts/:id/name/:name', { id: '2', name: 'test', query1: 'with<and&symbols' });
        expect(result).toBe('/contacts/2/name/test?query1=with%3Cand%26symbols');
    });

});

