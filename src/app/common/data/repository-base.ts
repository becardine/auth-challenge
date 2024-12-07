import { HttpClient } from '@angular/common/http'
import { inject } from '@angular/core'
import omit from 'lodash/omit'
import { Observable, catchError, firstValueFrom, map } from 'rxjs'
import { environment } from 'src/environments/environment'
import type { IMapper } from './interfaces'
import type {
  Filter,
  FilterMany,
  FilterPage,
  IRepository,
  Page,
} from './interfaces/repository'

export abstract class RepositoryBase<T extends object, S extends object>
  implements IRepository<T>
{
  protected readonly _httpClient = inject(HttpClient)

  constructor(
    protected readonly _path: string,
    protected readonly _mapper: IMapper<T, S>,
  ) {}

  public async find(filter?: FilterMany<T>): Promise<T[]> {
    return await this._resolve(
      this._httpClient
        .get<{ data: S[] }>(this._resolveUrl(), {
          headers: {},
          params: {
            where: JSON.stringify(filter?.where),
            pageSize: filter?.pageSize?.toString() ?? '',
          },
        })
        .pipe(
          map((res) => res.data.map((data) => this._mapper.toEntity(data))),
        ),
    )
  }

  public async findOne(filter: Filter<T>): Promise<T> {
    return await this._resolve(
      this._httpClient
        .get<{ data: S }>(this._resolveUrl(), {
          headers: {},
          params: {
            where: JSON.stringify(filter.where),
          },
        })
        .pipe(map((res) => this._mapper.toEntity(res.data))),
    )
  }

  public async findById(id: string): Promise<T> {
    return await this._resolve(
      this._httpClient
        .get<{ data: S }>(this._resolveUrl(id), {
          headers: {},
        })
        .pipe(map((res) => this._mapper.toEntity(res.data))),
    )
  }

  public async paginate(filter: FilterPage<T>): Promise<Page<T>> {
    return await this._resolve(
      this._httpClient
        .get<{ data: S[]; total: number }>(this._resolveUrl(), {
          headers: {},
          params: {
            where: JSON.stringify(filter.where),
            pageSize: filter.pageSize?.toString() ?? '',
            page: filter.page?.toString() ?? '',
          },
        })
        .pipe(
          map((res) => ({
            data: res.data.map((data) => this._mapper.toEntity(data)),
            total: res.total,
          })),
        ),
    )
  }

  public async create(entity: T): Promise<void> {
    return await this._resolve(
      this._httpClient.post<{ data: { id: number } }>(
        this._resolveUrl(),
        omit(this._mapper.toJSON(entity), 'id'),
        {
          headers: {},
        },
      ),
    ).then(({ data }) => {
      Object.assign(entity, { id: data.id.toString() })
    })
  }

  public async update(entity: T): Promise<void> {
    return await this._resolve(
      this._httpClient.patch<void>(
        this._resolveUrl(),
        this._mapper.toJSON(entity),
        {
          headers: {},
        },
      ),
    )
  }

  public async delete(id: string): Promise<void> {
    return await this._resolve(
      this._httpClient.delete<void>(this._resolveUrl(id), {
        headers: {},
      }),
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected _resolve(observable: Observable<any>) {
    return firstValueFrom(
      observable.pipe(
        catchError((error, caught) => {
          if (error.error.message) {
            throw new Error(error.error.message)
          }

          return caught
        }),
      ),
    )
  }

  protected _resolveUrl(suffix?: string, path = this._path) {
    const uri = `${environment.apiBaseUrl}${path}`
    if (suffix) {
      return `${uri}/${suffix}`
    }

    return uri
  }
}
