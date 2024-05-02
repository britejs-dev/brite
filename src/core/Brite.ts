import type { ServeOptions } from "bun";
import type { MaybePromise } from "../types";
import BriteContext from "./BriteContext";
import type { BriteFunctionality, Extender } from "./extension";

interface LifeCycle {
  onStart(callback?: () => null): Brite;
  onStop(callback?: () => null): Brite;
}

export default class Brite implements LifeCycle, Extender {
  private context: BriteContext;

  constructor() {
    this.context = new BriteContext();
  }

  extend(extension: BriteFunctionality): Extender {
    this.context.extend(extension);
    return this;
  }

  onStart(callback?: (() => null) | undefined): Brite {
    throw new Error("Method not implemented.");
  }
  onStop(callback?: (() => null) | undefined): Brite {
    throw new Error("Method not implemented.");
  }

  start() {}

  stop() {}

  listen(port: number) {
    const options: ServeOptions = {
      port,
      fetch(request: Request, server): MaybePromise<Response> {
        return new Response();
      },
    };
    Bun.serve(options);
  }
}
