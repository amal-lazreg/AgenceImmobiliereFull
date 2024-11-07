import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  private apiUrl = 'http://localhost:3000/api/mail';


  constructor(private http : HttpClient) { }


  sendContactData(contactData: any): Observable<any> {
    return this.http.post(this.apiUrl, contactData);
  }
}
