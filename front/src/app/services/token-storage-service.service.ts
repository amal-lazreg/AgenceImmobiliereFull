import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';



@Injectable({
  providedIn: 'root'
})
export class TokenStorageServiceService {

  isUpdate = false


  constructor() { }


  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): any {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  deleteToken() {
    window.sessionStorage.removeItem(TOKEN_KEY) ; 
   }

   public saveUser(user:any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }



  public getUser(): any {
    const userString = sessionStorage.getItem(USER_KEY);
    if(this.isUpdate == true){
      window.location.reload()
    }
    if (userString !== null) {
      return JSON.parse(userString);
    } else {
      throw new Error("Aucun utilisateur n'a été trouvé dans la session.");
    }
   
  }

}
