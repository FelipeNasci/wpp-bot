import ExpireMap from "expiry-map";
import { IInMemoryDatabase } from "../interface";

type MemoryDatabaseParams = { time?: number };

export class InMemoryDatabase<Key = string, Value = any>
  implements IInMemoryDatabase<Key, Value>
{
  private db: ExpireMap<Key, Value>;

  constructor({ time }: MemoryDatabaseParams) {
    this.db = new ExpireMap<Key, Value>(time);
  }

  set(key: Key, value: Value) {
    this.db.set(key, value);
  }

  get(key: Key) {
    return this.db.get(key);
  }

  delete(key: Key) {
    this.db.delete(key);
  }
}
