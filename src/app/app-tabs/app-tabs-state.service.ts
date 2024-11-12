import { Injectable, signal } from '@angular/core';
import { ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

export enum AppFeature {
  Address = 'address',
  Table = 'table',
  Dashboard = 'dashboard',
}

export interface AppTab {
  key: string;
  label: string;
  route: string;
  context: string;
  feature: AppFeature;
}

@Injectable({
  providedIn: 'root',
})
export class AppTabsStateService {
  // store
  routeHandlers = signal(new Map<string, DetachedRouteHandle>());
  tabs = signal<AppTab[]>([]);

  /** Generates a unique key for the route based on the path and parameters */
  getRouteKey(route: ActivatedRouteSnapshot): string {
    const path = route.routeConfig?.path ?? '';
    const context = route.params['context'] ?? '';
    return path.replace(':context', context);
  }

  openTab(label: string, route: string, feature: AppFeature): AppTab {
    const context = new Date().getTime().toString();

    const newTab = {
      key: `${route}/${context}`,
      label: label,
      route: route,
      context: context,
      feature: feature,
    };

    this.tabs.update(curr => [...curr, newTab]);
    return newTab;
  }

  async closeTab(tab: AppTab): Promise<AppTab | undefined> {
    const closeTabIndex = this.tabs().findIndex(t => t.key === tab.key);
    this.tabs.update(tabs => [...tabs.filter(t => t.key !== tab.key)]);

    this.routeHandlers.update(handlers => {
      handlers.delete(tab.key);
      return handlers;
    });

    if (closeTabIndex > 0) return this.tabs()[closeTabIndex - 1];
    else if (this.tabs().length > 0) return this.tabs()[0];
    else return undefined;
  }
}
