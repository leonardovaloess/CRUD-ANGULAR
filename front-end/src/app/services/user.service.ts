import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../Interfaces/IUsers.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  public users$: Observable<IUser[]> = this.usersSubject.asObservable();

  API_URL: string = 'http://localhost:3000/users';
  constructor(private httpClient: HttpClient) {
    this.getUsers()
  }

  getUsers(): Observable<any> {
    return this.httpClient.get(this.API_URL);
  }

  postUsers(user: IUser): Observable<any> {
    return this.httpClient.post(this.API_URL, user);
  }

  deleteUser(id: Number): Observable<any> {
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.delete(url);
  }

  //EDITAR
  // putUser(user: IUser) {
  //   const src = `${this.API_URL}/${user.id}`
  //   return this.httpClient.put(src, user);
  // }
}
