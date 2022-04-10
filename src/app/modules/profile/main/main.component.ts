import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'fm-main',
  templateUrl: './main.component.html',
  styleUrls: ['main.component.less']
})
export class MainComponent implements OnInit {

  constructor(private authService: AuthService) { }

  public user: Observable<string> = this.authService.userProfile().pipe(
    map((data: {username: string}) => data.username)
  );

  ngOnInit(): void {
  }

}
