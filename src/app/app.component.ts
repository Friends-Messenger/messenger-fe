import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorageService} from './services/local-storage.service';
import {Constants} from './utils/constants';
import {defaultLang} from './utils/locale.list.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  constructor(private authService: AuthService,
              private translateService: TranslateService,
              private localStorage: LocalStorageService) {
  let currentLanguage: string = this.localStorage.getItem(Constants.LANGUAGE);
  if (!currentLanguage) {
    currentLanguage = defaultLang.localeCode;
    this.localStorage.setItem(Constants.LANGUAGE, currentLanguage);
  }
  this.translateService.setDefaultLang(defaultLang.localeCode as string);
  this.translateService.use(currentLanguage);
  }

  // TODO
  logOut(): void {
    this.authService.logOut();
  }
}
