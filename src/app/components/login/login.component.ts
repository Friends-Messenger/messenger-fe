import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // TODO: implement validators
    this.form = fb.group({
      username: [''],
      password: [''],
    });
  }

  public form: FormGroup;

  ngOnInit(): void {
  }

  login(): void {
    console.log(this.form.value);
    this.authService.logIn(this.form.value)
      .subscribe((data) => {
        console.log(data);
        this.authService.setToken(data);
        this.router.navigate(['profile']);
      });
  }

}
