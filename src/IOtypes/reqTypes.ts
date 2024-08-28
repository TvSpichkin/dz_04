import {Request} from "express";

export type ReqParam<P> = Request<P>; // Запрос с параметрами
export type ReqBody<T> = Request<{}, {}, T>; // Запрос с телом
export type ReqQuery<V> = Request<{}, {}, {}, V>; // Запрос с вопросом
export type ReqParamBody<P, T> = Request<P, {}, T>; // Запрос с параметрами и телом
