import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    LoginUserDto,
  LoginUserDtoUserEnvelope,
  NewUserDto,
  NewUserDtoUserEnvelope,
  UserDtoUserEnvelope,
} from '../models/users.model';
import { Observable, delay, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private httpClient: HttpClient) {}

  set Token(token: string | null) {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  get Token() {
    return localStorage.getItem('token') ?? null;
  }


  registerUser(user: NewUserDto): Observable<UserDtoUserEnvelope> {
    const envelope: NewUserDtoUserEnvelope = {
      user,
    };
    return this.httpClient.post<UserDtoUserEnvelope>(
      'http://localhost:5000/Users',
      envelope
    ).pipe(
        tap(res=>{
            this.Token = res.user?.token ?? null;
        })
    );
  }


  login(user: LoginUserDto): Observable<UserDtoUserEnvelope>{
    const envelope: LoginUserDtoUserEnvelope = {
        user
    }
    return this.httpClient.post<UserDtoUserEnvelope>(
        'http://localhost:5000/Users/Login',
        envelope
      ).pipe(
          //delay(3000),
          tap(res=>{
              this.Token = res.user?.token ?? null;
          })
      );
  }

}
