export type Page<T> = {
  data: T[]
  total: number
}

export type Filter<T> = {
  where?: Where<T>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type Where<T> = Record<string, unknown>

export type FilterMany<T> = Filter<T> & {
  pageSize?: number
}

export type FilterPage<T> = FilterMany<T> & {
  page?: number
}

export interface IRepository<T>
  extends IReadRepository<T>,
    IWriteRepository<T> {}

export interface IReadRepository<T> {
  find(filter: FilterMany<T>): Promise<T[]>
  findOne(filter: Filter<T>): Promise<T>
  findById(id: string): Promise<T>

  paginate(filter: FilterPage<T>): Promise<Page<T>>
}

export interface IWriteRepository<T> {
  create(entity: T): Promise<void>
  update(entity: T): Promise<void>
  delete(id: string): Promise<void>
}
