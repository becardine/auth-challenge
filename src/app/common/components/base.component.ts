import { coerceArray } from '@angular/cdk/coercion'
import { Directive, inject, signal } from '@angular/core'
import {
  ActivatedRoute,
  Router,
  type NavigationExtras,
  type ParamMap,
} from '@angular/router'

@Directive()
export abstract class ComponentBase {
  protected readonly _router = inject(Router)
  protected readonly _activatedRoute = inject(ActivatedRoute)

  public isLoading = signal<boolean>(false)

  protected get params(): ParamMap {
    return this._getLastChild(this._activatedRoute.snapshot).paramMap
  }

  protected get queryParams(): ParamMap {
    return this._getLastChild(this._activatedRoute.snapshot).queryParamMap
  }

  public async navigateTo(
    path: string | string[],
    extras?: NavigationExtras,
  ): Promise<void> {
    this._router.navigate(coerceArray(path), {
      relativeTo: this._getLastChild(this._activatedRoute),
      ...extras,
    })
  }

  protected _getLastChild<T extends { firstChild: T | null }>(state: T): T {
    if (state.firstChild !== null && state.firstChild !== undefined) {
      return this._getLastChild(state.firstChild!)
    }
    return state
  }

  public async load<T>(fn: (() => Promise<T>) | Promise<T>): Promise<T> {
    this.isLoading.update(() => true)
    try {
      if (fn instanceof Promise) {
        return await fn
      }
      return await fn()
    } finally {
      this.isLoading.update(() => false)
    }
  }
}
