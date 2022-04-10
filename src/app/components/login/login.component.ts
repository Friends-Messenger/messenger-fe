import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/auth/auth.service';

@Component({
    selector: 'fm-login',
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
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    public form: FormGroup;

    ngOnInit(): void {
    }

    login(): void {
        const credentials = {
            username: this.form.value.username.trim(),
            password: this.form.value.password.trim()
        };
        this.authService.logIn(credentials)
            .subscribe((data) => {
                console.log(data);
                this.authService.setToken(data);
                this.router.navigate(['profile']);
            });
    }

}
