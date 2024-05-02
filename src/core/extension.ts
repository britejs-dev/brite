export interface BriteFunctionality {}
export interface Extender {
  extend(extension: BriteFunctionality): Extender;
}
export abstract class EmailProvider implements BriteFunctionality {}
export abstract class StorageProvider implements BriteFunctionality {}
export abstract class DBAdapter implements BriteFunctionality {}
