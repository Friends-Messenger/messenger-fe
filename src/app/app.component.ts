import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(private authService: AuthService) {}

  username = 'john';
  password = 'changeme';

  login(): void {
    this.authService.logIn({ username: this.username, password: this.password })
      .subscribe((data) => {
        console.log(data);
        this.authService.setToken(data);
      });
  }

  // TODO: delete
  getData(): void {
    this.authService.test().subscribe((data) => {
      console.log('Response from server', data);
    });
  }

  logOut(): void {
    this.authService.logOut();
  }
}
