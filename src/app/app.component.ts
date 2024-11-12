import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppTabsComponent } from './app-tabs/app-tabs.component';
import { AppMenuComponent } from "./app-menu/app-menu.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppTabsComponent, AppMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ng-app-tabs';
}
