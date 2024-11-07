import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, TitleStrategy } from '@angular/router';
import { AuthUsersService } from '../../services/auth-users.service';
import { AuthResponse } from 'src/app/interface/AuthResponse';
import { TokenStorageServiceService } from '../../services/token-storage-service.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  isLoggedOut = false;
  roles: string[] = [];

  dataToken: any


  username: string = '';
  password: string = '';


  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  signupForm: FormGroup | any

  constructor(private auth: AuthUsersService, private router: Router, private tokenStorage: TokenStorageServiceService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

    const container = document.getElementById('container');
    const overlayBtn = document.getElementById('overlayBtn');

    overlayBtn?.addEventListener('click', () => {
      container?.classList.toggle('right-panel-active');
    });
    console.log('signin')
  }

  //signin(f:any){

  //   let data=f.value
  //   this.auth.signin(data).subscribe(data => {
  //   this.dataToken = data
  //   this.auth.saveToken(this.dataToken.token)
  //this.route.navigate(['/userProfil'])

  //  if (this.tokenStorage.getUser().roles.includes('user')) {
  //    this.router.navigate(['/userProfile']);
  //  } else if (this.tokenStorage.getUser().roles.includes('admin')) {
  //   this.router.navigate(['/adminProfile']);
  // } 
  // })

  // }
  onSubmit(f: any): void {
    this.auth.signin({ username: this.username, password: this.password })
      .subscribe(
        (response: AuthResponse) => {
          console.log('Login successful:', response);

          // Check if the response is successful
          if (response.success) {
            // Save user data in localStorage
            const userData = {
              email: response.email,
              username: response.username,
              role: response.role,
              token: response.token
            };
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('username', this.username);

            // Save token
            this.auth.saveToken(response.token);

            // Navigate based on user role
            if (response.role === 'user') {
              this.router.navigate(['/userProfile']);
            } else if (response.role === 'admin') {
              this.router.navigate(['/adminProfile']);
            }
          } else {
            // Handle unsuccessful login
            console.error('Login failed:', response.message);
            this.errorMessage = 'Invalid username or password';
          }
        },
        error => {
          console.error('Login error:', error);
          this.errorMessage = 'Invalid username or password';
        }
      );
  }


}