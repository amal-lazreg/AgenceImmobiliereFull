import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Partenaire } from '../class/partenaire';

@Injectable({
  providedIn: 'root'
})
export class PartenaireService {

  
  private partenaire? : Partenaire ;
  private baseURI : String ="http://localhost:3000/api"
  private headers = new HttpHeaders().set('Content-Type','application/json')

  constructor(private http:HttpClient) { }


  addPartenaire(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseURI}/addPartenaires`, data);
  }

  getAllPartenaire(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURI}/allPartenaires`);
  }

  deletePartenaire(id : string){
    return this.http.delete(this.baseURI+'/deletePartenaire/'+id,{headers:this.headers})
  }


}
