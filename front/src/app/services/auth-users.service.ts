import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../interface/AuthResponse';


@Injectable({
  providedIn: 'root'
})

export class AuthUsersService {
  private apiUrl = 'http://localhost:3000/api'
  constructor(private http: HttpClient) { }


  signup(body: any) {
    return this.http.post('http://localhost:3000/api/signup', body)

  }

  signin(credentials: { username: string, password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/signin`, credentials).pipe(
      tap(res => {
        // localStorage.setItem('username', res.username); 

      })
    );
  }

  saveToken(token: any) {
    localStorage.setItem('tokenuser', token)
  }



  logout(): void {
    localStorage.removeItem('token');
  }
}
