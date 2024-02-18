import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../../Interfaces/IUsers.interface';
import { UserService } from '../../../services/user.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule,FormsModule],
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
  standalone: true,
})
export class UsersTableComponent implements OnInit {
  constructor(public userService: UserService, private http: HttpClient) {}

  async ngOnInit() {
    await this.userService.getUsers();
  }

  public deleteUser(id: number) {
    this.userService.deleteUser(id);
  }

  editedUser: IUser = {
    name: '',
    email: '',
    phone: '',
    id: 0,
  };

  putUrl: string = 'http://localhost:3000/users/';

  public getID(id: number) {
    this.editedUser.id = id;
    console.log(this.editedUser.id);
  }

  public putUser() {
    this.userService.editUser(this.editedUser)

    this.editedUser = {
      name: '',
      email: '',
      phone: '',
      id: 0,
    }
  }
}
