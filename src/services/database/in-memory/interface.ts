export interface IInMemoryDatabase<Key, Value> {
  set: (key: Key, value: Value) => void;
  get: (key: Key) => Value;
  delete: (key: Key) => void;
}
