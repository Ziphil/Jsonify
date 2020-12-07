//


export type ExtractRequired<T extends object, P extends keyof T> = undefined extends T[P] ? never : P;
export type ExtractOptional<T extends object, P extends keyof T> = undefined extends T[P] ? P : never;
export type RequiredProperties<T extends object> = {[P in keyof T]: T[P] extends Function ? never : ExtractRequired<T, P>}[keyof T];
export type OptionalProperties<T extends object> = {[P in keyof T]: T[P] extends Function ? never : ExtractOptional<T, P>}[keyof T];
export type JsonPrimitive = string | number | boolean | null;

export type ShallowJsonify<T> = T extends JsonPrimitive ? T
  : T extends object ? {[P in RequiredProperties<T>]: T[P]} & {[P in OptionalProperties<T>]?: T[P]}
  : never;
export type Jsonify<T> = T extends [infer A] ? [Jsonify<A>]
  : T extends [infer A, infer B] ? [Jsonify<A>, Jsonify<B>]
  : T extends [infer A, infer B, infer C] ? [Jsonify<A>, Jsonify<B>, Jsonify<C>]
  : T extends [infer A, infer B, infer C, infer D] ? [Jsonify<A>, Jsonify<B>, Jsonify<C>, Jsonify<D>]
  : T extends [infer A, infer B, infer C, infer D, infer E] ? [Jsonify<A>, Jsonify<B>, Jsonify<C>, Jsonify<D>, Jsonify<E>]
  : T extends [infer A, infer B, infer C, infer D, infer E, infer F] ? [Jsonify<A>, Jsonify<B>, Jsonify<C>, Jsonify<D>, Jsonify<E>, Jsonify<F>]
  : T extends Array<infer U> ? Array<Jsonify<U>>
  : T extends object ? {[K in keyof ShallowJsonify<T>]: Jsonify<ShallowJsonify<T>[K]>}
  : ShallowJsonify<T>;