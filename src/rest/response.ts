import Cookie, { type CookieSerializeOptions } from "cookie";

export class ResponseBuilder {
  private resInit: ResponseInit = {};

  private headers = () => new Headers(this.resInit.headers);

  status(status: number | string): ResponseBuilder {
    this.resInit.status = typeof status === "number" ? status : parseInt(status);
    return this;
  }

  redirect(url: string): ResponseBuilder {
    const h = this.headers();
    h.set("Location", url);
    this.resInit.headers = h;
    return this;
  }

  cookie(name: string, value: string, options?: CookieSerializeOptions): ResponseBuilder {
    const cookie = Cookie.serialize(name, value, options);
    const h = this.headers();
    h.set("Set-Cookie", cookie);
    this.resInit.headers = h;
    return this;
  }

  set(key: string, value: string): ResponseBuilder;
  set(headers: Record<string, string>): ResponseBuilder;

  set(arg1: string | Record<string, string>, value?: string): ResponseBuilder {
    const h = this.headers();
    if (typeof arg1 === "string" && value !== undefined) {
      h.set(arg1, value);
    } else if (typeof arg1 === "object") {
      for (const [key, value] of Object.entries(arg1)) {
        h.set(key, value);
      }
    }

    this.resInit.headers = h;

    return this;
  }

  build(): ResponseInit {
    return this.resInit;
  }
}
