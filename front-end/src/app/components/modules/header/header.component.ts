import { compileDeclarePipeFromMetadata } from '@angular/compiler';
import { Component, OnInit, input } from '@angular/core';
import { IUser } from '../../../Interfaces/IUsers.interface';
import { UserService } from '../../../services/user.service';
import { UsersTableComponent } from '../users-table/users-table.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [UsersTableComponent],
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

  public postUser() {
    const userName: string = (
      document.getElementById('name_input') as HTMLInputElement
    ).value;

    const userEmail: string = (
      document.getElementById('email_input') as HTMLInputElement
    ).value;

    const userPhone: string = (
      document.getElementById('phone_input') as HTMLInputElement
    ).value;

    //Padrão do email
    const emailRegExp: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    this.newUser.name = userName;

    //Padrão do numero de celular
    const numberRegExp: RegExp = /^[0-9]+$/;

    if (!emailRegExp.test(userEmail) || !numberRegExp.test(userPhone)) {
      alert('Email ou número de telefone inválidos');
    } else {
      this.newUser.phone = userPhone;
      this.newUser.email = userEmail;
      this.userService.postUsers(this.newUser).subscribe(
        (response) => {
          console.log('Usuário criado com sucesso!', response);
        },
        (error) => {
          console.log('Erro ao criar usuário!', error);
        }
      );
    }

    const userNameInput = document.getElementById(
      'name_input'
    ) as HTMLInputElement;
    userNameInput.value = '';
    const userEmailInput = document.getElementById(
      'email_input'
    ) as HTMLInputElement;
    userEmailInput.value = '';
    const userPhoneInput = document.getElementById(
      'phone_input'
    ) as HTMLInputElement;
    userPhoneInput.value = '';
  }
}
