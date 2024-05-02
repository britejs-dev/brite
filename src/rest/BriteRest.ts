import RestContext from "@rest/RestContext";

export default class BriteRest {
  private context: RestContext;

  constructor() {
    this.context = new RestContext();
  }
}
