import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-count',
  standalone: true,
  imports: [],
  templateUrl: './user-count.component.html',
  styleUrl: './user-count.component.scss'
})
export class UserCountComponent {
  constructor(public userService: UserService) {}
}
