import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';
import { Credentials } from '../models/credentials.model';
import { environment } from '../../environments/environment';

export interface Token {
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  public env = environment.apiUrl;

  public logIn(credentials: Credentials): Observable<Token> {
    return this.http.post<Token>(`${this.env}auth/login`, credentials);
  }

  public logOut(): void {
    localStorage.removeItem('access_token');
  }

  public setToken(token: Token): void {
    localStorage.setItem('access_token', token.access_token);
  }

  public getToken(): string {
    return localStorage.getItem('access_token');
  }

  // TODO: delete
  public test(): Observable<any> {
    return this.http.get(`${this.env}auth/profile`);
  }
}
