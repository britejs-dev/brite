import { type BriteFunctionality, DBAdapter, EmailProvider, StorageProvider } from "@core/extension";

export default class BriteContext {
  private emailProvider?: EmailProvider;
  private storageProvider?: StorageProvider;
  private dbAdapter?: DBAdapter;

  extend(extension: BriteFunctionality) {
    if (extension instanceof EmailProvider) this.emailProvider = extension;
    else if (extension instanceof StorageProvider) this.storageProvider = extension;
    else if (extension instanceof DBAdapter) this.dbAdapter = extension;
    else throw new Error("Your extension type is not supported.");
  }
}
