import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../../Interfaces/IUsers.interface';
import { UserService } from '../../../services/user.service';
import { NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
  standalone: true,
})
export class UsersTableComponent implements OnInit {
  userList: IUser[] = [];

  constructor(private userService: UserService, private http: HttpClient) {}

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers() {
    this.userService.getUsers().subscribe({
      next: (result) => {
        this.userList = result;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  public deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(
      () => {
        console.log('Excluido com sucesso!');
        this.getUsers;
      },
      (error) => {
        console.log('Erro ao excluir: ', error);
      }
    );
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
    console.log(this.editedUser);
    const userName: string = (
      document.getElementById('name_input_edit') as HTMLInputElement
    ).value;

    const userEmail: string = (
      document.getElementById('email_input_edit') as HTMLInputElement
    ).value;

    const userPhone: string = (
      document.getElementById('phone_input_edit') as HTMLInputElement
    ).value;

    this.editedUser.name = userName;
    this.editedUser.email = userEmail;
    this.editedUser.phone = userPhone;

    this.http.put(this.putUrl + this.editedUser.id, this.editedUser).subscribe(
      () => {
        console.log('Atualizado com sucesso');
      },
      (error) => {
        console.log('Erro ao atualizar! ', error.message);
      }
    );
  }
}
