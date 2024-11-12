import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';
import { AppTabsStateService } from './app-tabs-state.service';

export class TabsReuseStrategy implements RouteReuseStrategy {
  state = inject(AppTabsStateService);

  /** Determines if this route (and its subtree) should be detached to be reused later */
  public shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const key = this.state.getRouteKey(route);
    const shouldDetach = this.state.tabs().some(tab => tab.key === key);
    return shouldDetach;
  }

  /** Stores the detached route */
  public store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    if (route.routeConfig?.path) {
      const key = this.state.getRouteKey(route);
      this.state.routeHandlers.update(curr => curr.set(key, handle));
    }
  }

  /** Determines if this route (and its subtree) should be reattached */
  public shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const key = this.state.getRouteKey(route);
    return !!route.routeConfig && !!this.state.routeHandlers().get(key);
  }

  /** Retrieves the previously stored route */
  public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    if (!route.routeConfig || route.routeConfig.path === undefined) {
      return {};
    }
    const key = this.state.getRouteKey(route);
    return this.state.routeHandlers().get(key) ?? {};
  }

  /** Determines if a route should be reused */
  public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig && this.state.getRouteKey(future) === this.state.getRouteKey(curr);
  }
}
