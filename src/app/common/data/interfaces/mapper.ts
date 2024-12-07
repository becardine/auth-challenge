export interface IMapper<T, S> {
  toJSON(entity: T): S
  toEntity(schema: S): T
}
