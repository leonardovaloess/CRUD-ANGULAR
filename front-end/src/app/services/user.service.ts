import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { IUser } from '../Interfaces/IUsers.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public userList: IUser[] = [];

  API_URL: string = 'http://localhost:3000/users';
  constructor(private httpClient: HttpClient) {
    console.log('User Service is working!')
    this.getUsers()
  }

  async getUsers(): Promise<IUser[]> {
    const users = await firstValueFrom(this.httpClient.get<IUser[]>(this.API_URL));
    this.userList = users;
    return users;
  }

  async insertUser(user: IUser): Promise<IUser> {
    const userCreated = await firstValueFrom(this.httpClient.post(this.API_URL, user))
    this.userList.push(userCreated as IUser);
    return user
  }

  deleteUser(id: Number) {
    const url = `${this.API_URL}/${id}`;
    this.httpClient.delete(url).subscribe(() => {
      console.log('Excluido com sucesso!');
      this.userList = this.userList.filter((user) => user.id !== id);
    })
  }

  //EDITAR
  editUser(user: IUser) {
    const src = `${this.API_URL}/${user.id}`
    return this.httpClient.put(src, user).subscribe(
      ()=>{
        console.log("Editado com sucesso! ")
        this.getUsers()
      }
      );
  }
}
