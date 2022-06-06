import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // const authToken = this.authService.getToken();
    const authRequest = request.clone({
      headers: request.headers
        .set('Host', 'localhost:8080')
        .set('Origin', 'http://localhost:4200')
        .set(
          'Authorization',
          'Bearer ' +
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhamF5Iiwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvYXBpL2xvZ2luIiwiZXhwIjoxNjUzODk3ODc4fQ._iMfjK-kfuIxHGtLFSFofKubaz313LC3X0YkvOqF93A'
        )

        .set('Referer', 'http://localhost:4200/'),
      //   'Host', 'localhost:8080'
      //   'Origin', 'http://localhost:4200'
      //   'Referer', 'http://localhost:4200/'
    });
    return next.handle(authRequest);
  }
}
