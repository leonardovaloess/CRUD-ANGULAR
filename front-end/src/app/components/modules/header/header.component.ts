import { compileDeclarePipeFromMetadata } from '@angular/compiler';
import { Component, Input, OnInit, input } from '@angular/core';
import { IUser } from '../../../Interfaces/IUsers.interface';
import { UserService } from '../../../services/user.service';
import { UsersTableComponent } from '../users-table/users-table.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [UsersTableComponent, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {}

  constructor(private userService: UserService) {}

  newUser: IUser = {
    name: '',
    email: '',
    phone: '',
    id: 0,
  };

  public async postUser() {
    const emailRegExp: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const numberRegExp: RegExp = /^[0-9]+$/;

    if (
      !emailRegExp.test(this.newUser.email) ||
      !numberRegExp.test(this.newUser.phone)
    ) {
      alert('Email ou número de telefone inválidos');
      return;
    }

    const createdUser = await this.userService.insertUser(this.newUser);

    this.newUser = {
      name: '',
      email: '',
      phone: '',
      id: 0,
    };

    alert(`Usuario ${createdUser.name} criado com sucesso!`);
  }
}
