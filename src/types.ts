import RestContext from "@rest/RestContext";

export type MaybePromise<T> = Promise<T> | T;

export type Handler = <T, BodyType = unknown, QueryType = Record<string, unknown>, ParamsType = Record<string, string>>(
  context: RestContext<BodyType, QueryType, ParamsType>
) => MaybePromise<T> | undefined | null;
