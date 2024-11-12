import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { AppFeature, AppTabsStateService } from '../app-tabs/app-tabs-state.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './app-menu.component.html',
  styleUrl: './app-menu.component.scss',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
})
export class AppMenuComponent {
  readonly router = inject(Router);
  readonly tabState = inject(AppTabsStateService);
  readonly AppFeature = AppFeature;

  onMenuClick(label: string, route: string, feature: AppFeature) {
    const newTab = this.tabState.openTab(label, route, feature);
    this.router.navigate([newTab.route, newTab.context]);
  }
}
