import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUsersService } from '../../services/auth-users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  signupForm: FormGroup | any

  constructor(private authService: AuthUsersService, private router: Router,private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  onSubmit(): void {
    this.authService.signup(this.form.value).subscribe({
      next: (res) => {
        console.log(res);
        this.isSuccessful = true;
        this.isSignUpFailed = false;

      }, error: (error) => {
        this.errorMessage = error?.error.message;
        this.isSignUpFailed = true;
      }
    }
    );
  }
  navigateToSignIn() {
    this.router.navigate(['/signin']);
  }
}
