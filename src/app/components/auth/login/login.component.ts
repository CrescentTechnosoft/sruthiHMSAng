import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean;
  isAuthenticating: boolean;
  message: string = '';
  returnUrl: string;

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.submitted = false;
    this.isAuthenticating = false;
    this.loginForm = new FormGroup({
      'userName': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] ?? 'dashboard';
  }
  get GetFormControls() {
    return this.loginForm.controls;
  }

  Login(): void {
    this.submitted = true;
    this.isAuthenticating = true;
    if (!this.loginForm.invalid) {
      this.auth.validateLogin(this.loginForm.get('userName').value, this.loginForm.get('password').value)
        .toPromise()
        .then((r) => {
          if (r.status) {
            localStorage.setItem('user', r.user);
            this.auth.isLoggedIn = true;
            this.auth.accessDatas = r.access;
            this.router.navigateByUrl(this.returnUrl);
          }
          else {
            this.message = r.message;
          }
        }).catch((e) => {
          this.message = 'An Error Occured while Login...';
        })
        .finally(() => this.isAuthenticating = false);
    }
  }

}


