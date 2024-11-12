import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppTab, AppTabsStateService } from './app-tabs-state.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './app-tabs.component.html',
  styleUrl: './app-tabs.component.scss',
})
export class AppTabsComponent {
  protected router = inject(Router);
  protected state = inject(AppTabsStateService);
  protected activatedRoute = inject(ActivatedRoute);

  getRouterLink(tab: AppTab): string[] {
    return [tab.route, tab.context];
  }

  isCurrentRoute(tab: AppTab): boolean {
    return this.router.url === `/${tab.route}/${tab.context}`;
  }

  selectTab(tab: AppTab) {
    this.router.navigate(['/', tab.route, tab.context]);
  }

  async closeTab(tab: AppTab) {
    console.log('closeTab', tab);
    const nextTab = await this.state.closeTab(tab);
    console.log('nextTab', nextTab);
    if (nextTab) {
      this.selectTab(nextTab);
    } else {
      this.router.navigate(['/']);
    }
  }
}
