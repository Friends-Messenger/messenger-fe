import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(private authService: AuthService) {}

  // TODO
  logOut(): void {
    this.authService.logOut();
  }
}
