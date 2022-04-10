import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import {SharedModules} from './modules/shared/shared.modules';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {LocalStorageService} from './services/local-storage.service';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  const hash = window.location.hash || '';
  return new TranslateHttpLoader(
    http,
    './assets/i18n/',
    '.json' + (hash && `?t=${hash}`)
  );
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModules,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
