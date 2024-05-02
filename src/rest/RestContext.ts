import { ResponseBuilder } from "./response";

interface RestContextOptions<
  BodyType = unknown,
  QueryType = Record<string, unknown>,
  ParamsType = Record<string, string>,
  HeaderType = Record<string, string>
> {
  body?: BodyType;
  query?: QueryType;
  params?: ParamsType;
  headers?: HeaderType;
}

/**
 * RestContext is the abstract class of a REST request.
 */
export default class RestContext<
  BodyType = unknown,
  QueryType = Record<string, unknown>,
  ParamsType = Record<string, string>,
  HeaderType = any
> {
  /**
   * A ReadableStream of the body contents.
   */
  body?: BodyType;
  query?: QueryType;
  params?: ParamsType;
  request: Request;

  res: ResponseBuilder = new ResponseBuilder();

  constructor(request: Request, options: Partial<RestContextOptions<BodyType, QueryType, ParamsType, HeaderType>> = {}) {
    this.request = request;
    this.body = options.body;
    this.query = options.query;
    this.params = options.params;
    this.headers = options.headers;
  }

  /**
   * Contains the associated Headers object of the request.
   */
  headers?: HeaderType;
  [other: string]: unknown;

  /**
   * Let's you add a new key-value pair to RestContext, and then use in upcoming middlewares.
   * @param key The key which is set in [RestContext] object.
   * @param value The corresponding value.
   */
  set(key: string, value: unknown) {
    this[key] = value;
  }

  get(key: string): unknown {
    return this[key];
  }
}
