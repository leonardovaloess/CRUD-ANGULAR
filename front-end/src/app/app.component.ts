import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/modules/header/header.component';
import { UsersTableComponent } from './components/modules/users-table/users-table.component';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, UsersTableComponent,  FormsModule],
  template: `
    <app-header />
    <app-users-table  />
    
  `,

})
export class AppComponent {
  title = 'front-end';
}
