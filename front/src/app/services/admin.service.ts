import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../class/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  private baseURI: String = "http://localhost:3000/api/getUser"

  private apiUrl: string = "http://localhost:3000/api/admin/updateProfile"
  private headers = new HttpHeaders().set('Content-Type', 'application/json')


  private adminId: string | null = null;

  setAdminId(id: string) {
    this.adminId = id;
  }

  getAdminId(): string | null {
    return this.adminId;
  }


  constructor(private http: HttpClient) { }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseURI}/${id}`);
  }


  updateProfile(id: any, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  getUser(username: string) {
    let params = new HttpParams().set('username', username)
    return this.http.get(`http://localhost:3000/api/getIdByUsername`, { params: params })
  }


}
