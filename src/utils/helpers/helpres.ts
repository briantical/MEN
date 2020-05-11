import _ from 'lodash';
/**
 * @example
 *        .map(only('_id'))
 * **/
const only = (name: any) => (object: any) => _.get(object, name);

/**
 * @example
 *        .filter(notIn(_id))
 * **/
const notIn = (target: string | any[]) => (search: any) => !target.includes(search);

/**
 * @example
 *        .map(only('_id'))
 * **/
const fieldAs = (field: string | number, value: any) => (object: { [x: string]: any }) => object[field] === value;

/**
 * @example
 *        .map(idToString)
 * **/
const idToString = (id: { toString: () => any }) => id && id.toString();

/**
 * @example
 *        .map(idToString)
 * **/
const includes = (ids: any[], id: { toString: () => any }) => ids.map(idToString).includes(id.toString());

export = { only, notIn, fieldAs, idToString, includes };
