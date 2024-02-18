import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/modules/header/header.component';
import { UsersTableComponent } from './components/modules/users-table/users-table.component';
import { UserCountComponent } from './components/modules/user-count/user-count.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, UsersTableComponent, UserCountComponent, FormsModule],
  template: `
    <app-header />
    <app-users-table  />
    <app-user-count />
  `,

})
export class AppComponent {
  title = 'front-end';
}
