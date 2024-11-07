import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Annonce } from '../class/annonce';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {

  private annonce? : Annonce ;
  private baseURI : String ="http://localhost:3000/api"
  private headers = new HttpHeaders().set('Content-Type','application/json')

  constructor(private http:HttpClient) { }


  

  addAnnonce(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseURI}/addAnnonce`, data);
  }
  getAllAnnonce(){
    return this.http.get(this.baseURI+'/allAnnonces',{headers:this.headers})
  }

  getAllAnnonces(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURI}/allAnnonces`);
  }

  updateAnnonce(id: string, formData: FormData): Observable<any> {
    return this.http.put(`${this.baseURI}/updateAnnonce/${id}`, formData);
  }

  getAnnonce(id : string){
    return this.http.get(`${this.baseURI}/annonces/${id}`,{headers:this.headers});
  }
 


 

  deleteAnnonce(id : string){
    return this.http.delete(this.baseURI+'/deleteAnnonce/'+id,{headers:this.headers})
  }

  setter(annonce:Annonce){
    this.annonce=annonce;
  }

  getter(){
    return this.annonce;
  }






}
