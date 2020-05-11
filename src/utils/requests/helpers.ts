import _ from 'lodash';
// object => object // { 'profile.phone': '1111' } => {profile: { phone: '111' } }
export const parseFormDataBody = (body: { [x: string]: any }) => {
  const newBody = {};
  _.keys(body).forEach((key) => _.set(newBody, key, body[key]));
  return newBody;
};

/**
 * @example
 *
 *        const query = { 'documents.value' : 1 };
 *        queryToObject(query) === { documents: { value: 1 } };
 * **/

interface A {
  [x: string]: any;
}
export const queryToObject = (query: { [x: string]: any }): A => {
  const obj = {};
  _.keys(query).forEach((key) => _.set(obj, key, query[key]));
  return obj;
};

/**
 * @example
 *       _.pickBy({a: '', b: false, c: undefined }, onlyDefined) => { b:false }
 * **/
export const onlyDefined = (v: any) => (_.isString(v) && !!v) || (_.isBoolean(v) && true) || !!v;

/**
 * @example
 *       _.pickBy({a: '', b: false, c: undefined }, onlyDefined) => { b:false }
 * **/
export const pickFieldsFilterFor = (fields: any, Model: { schema: { paths: any } }) => {
  const piked = _.pick(fields || {}, _.keys(Model.schema.paths));
  _.keys(piked).forEach((key) => _.extend(piked, { [key]: parseInt(piked[key]) }));
  return piked;
};
