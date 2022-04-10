import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/auth/auth.service';
import {OnDestroyService} from '../../services/on-destroy.service';
import {finalize, takeUntil} from 'rxjs/operators';
import {MessageService} from 'primeng/api';

@Component({
    selector: 'fm-login',
    templateUrl: './login.component.html',
    styleUrls: ['login.component.less']
})
export class LoginComponent implements OnInit {

    public loading: boolean;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private destroy$: OnDestroyService,
        private messageService: MessageService
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

    public login(): void {
        this.loading = true;
        const credentials = {
            username: this.form.value.username.trim(),
            password: this.form.value.password.trim()
        };
        this.authService.logIn(credentials).pipe(
            takeUntil(this.destroy$),
            finalize(() => this.loading = false)
        ).subscribe((data) => {
            console.log(data);
            this.authService.setToken(data);
            this.router.navigate(['profile']);
        }, () => {
            this.showError();
        });
    }

    private showError(): void {
        this.messageService.add(
            {
                severity: 'error',
                summary: 'Error',
                detail: 'Authentication failed, please recheck data'
            }
        );
    }
}
