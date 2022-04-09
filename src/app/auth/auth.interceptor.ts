import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = httpRequest;
    const token = this.authService.getToken();

    if (token) {
      const header = {
        Authorization: `Bearer ${token}`
      };
      request = httpRequest.clone({ setHeaders: header });
    }

    return next.handle(httpRequest.clone(request));
  }
}
