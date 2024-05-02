import { HttpMethod } from "../enums";
import { type Handler } from "../types";

type DynamicPath = {
  path: string;
  regex?: RegExp;
  enums?: string[];
};

class Route {
  private path: string;
  private handler: Handler[];
  private children: Map<string, Handler | Handler[] | Route>;
  private isDynamic: boolean;
  private isEnd: boolean;
  private regex?: RegExp;
  private enums?: string[];

  constructor(path: string, ...handler: Handler[]) {
    this.isDynamic = this.checkIfIsDynamic(path);
    this.path = path;
    if (this.isDynamic) {
      const d = this.parseDynamicRoute(path);
      this.regex = d.regex;
      this.enums = d.enums;
      this.path = d.path;
    }
    this.handler = handler;
    this.children = new Map();
    this.isEnd = false;
  }

  private checkIfIsDynamic(path: string): boolean {
    return /\/:\w+(\/:\w+)*/.test(path);
  }

  private parseDynamicRoute(path: string): DynamicPath {
    let enums: string[] | undefined;
    let regex: RegExp | undefined;

    const regexMatch = /\{(.+?)\}/.exec(path);
    if (regexMatch) {
      regex = new RegExp(regexMatch[1]);
      path = path.replace(regexMatch[0], "");
    }

    const enumsMatch = /\[([^\]]*)\]/.exec(path);
    if (enumsMatch) {
      enums = enumsMatch[1].split(/\s*,\s*/);
      path = path.replace(enumsMatch[0], "");
    }

    return { path, regex, enums };
  }
}

export default class Router implements Routing {
  private route: Route;

  /**
   * Creates a router
   * @param prefixPath (optional) prefix a set of routes. e.g. /user, /product
   */
  constructor(prefixPath?: string) {
    this.route = new Route(prefixPath ?? "");
  }
  protected add(method: HttpMethod, path: string, ...handlers: Handler[]) {}

  put(path: string, ...handler: Handler[]): Routing {
    this.add(HttpMethod.PUT, path, ...handler);
    return this;
  }
  get(path: string, ...handler: Handler[]): Routing {
    this.add(HttpMethod.GET, path, ...handler);
    return this;
  }
  post(path: string, ...handler: Handler[]): Routing {
    this.add(HttpMethod.POST, path, ...handler);
    return this;
  }
  patch(path: string, ...handler: Handler[]): Routing {
    this.add(HttpMethod.PATCH, path, ...handler);
    return this;
  }
  delete(path: string, ...handler: Handler[]): Routing {
    this.add(HttpMethod.DELETE, path, ...handler);
    return this;
  }
  head(path: string, ...handler: Handler[]): Routing {
    this.add(HttpMethod.HEAD, path, ...handler);
    return this;
  }
  options(path: string, ...handler: Handler[]): Routing {
    this.add(HttpMethod.OPTIONS, path, ...handler);
    return this;
  }
  trace(path: string, ...handler: Handler[]): Routing {
    this.add(HttpMethod.TRACE, path, ...handler);
    return this;
  }
  connect(path: string, ...handler: Handler[]): Routing {
    this.add(HttpMethod.CONNECT, path, ...handler);
    return this;
  }

  all(path: string, ...handler: Handler[]): Routing {
    this.add(HttpMethod.ALL, path, ...handler);
    return this;
  }
}

export interface Routing {
  all(path: string, ...handler: Handler[]): Routing;
  put(path: string, ...handler: Handler[]): Routing;
  get(path: string, ...handler: Handler[]): Routing;
  post(path: string, ...handler: Handler[]): Routing;
  patch(path: string, ...handler: Handler[]): Routing;
  delete(path: string, ...handler: Handler[]): Routing;
  head(path: string, ...handler: Handler[]): Routing;
  options(path: string, ...handler: Handler[]): Routing;
  trace(path: string, ...handler: Handler[]): Routing;
  connect(path: string, ...handler: Handler[]): Routing;
}
