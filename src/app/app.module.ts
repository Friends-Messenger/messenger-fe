import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AuthInterceptor} from './auth/auth.interceptor';
import {SharedModules} from './modules/shared/shared.modules';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {LocalStorageService} from './services/local-storage.service';
import {LoginComponent} from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {OnDestroyService} from './services/on-destroy.service';
import {MessageService} from 'primeng/api';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
    const hash = window.location.hash || '';
    return new TranslateHttpLoader(
        http,
        './assets/i18n/',
        '.json' + (hash && `?t=${hash}`)
    );
}

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'profile', loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)},
    {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        RouterModule.forRoot(routes),
        ReactiveFormsModule,
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
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        LocalStorageService,
        OnDestroyService,
        MessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
