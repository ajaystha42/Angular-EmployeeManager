import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Compare } from 'src/app/model/Compare';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CompareService {
  private readonly COMPARE_YOURSELF_URL = environment.COMPARE_YOURSELF_URL;
  constructor(
    private readonly authService: AuthService,
    private readonly httpClient: HttpClient,
    private readonly router: Router
  ) {}

  private user: any;
  private userSubject = new Subject<any>();

  getUser() {
    return this.user;
  }

  getUserListener() {
    return this.userSubject.asObservable();
  }

  storeData(data: Compare) {
    this.authService
      .getAuthenticatedUser()
      ?.getSession((err: any, session: any) => {
        if (err) {
          alert(err || JSON.stringify(err.message));
          return;
        }

        const httpOptions = {
          headers: new HttpHeaders({
            Authorization: session.getIdToken().getJwtToken(),
          }),
        };

        this.httpClient
          .post(
            `${this.COMPARE_YOURSELF_URL}/compare-yourself`,
            data,
            httpOptions
          )
          .subscribe({
            next: (res) => {
              alert('Successfully Added');
              this.router.navigate(['/']);
            },
            error: (err) => {
              alert(err || err.message);
            },
          });
      });
  }

  retrieveData(isAll: boolean = false) {
    this.authService
      .getAuthenticatedUser()
      ?.getSession((err: any, session: any) => {
        const queryParam =
          '?accessToken=' + session.getAccessToken().getJwtToken();
        let urlParam = 'all';
        if (!isAll) urlParam = 'single';
        if (err) {
          alert(err || JSON.stringify(err.message));
          return;
        }
        const httpOptions = {
          headers: new HttpHeaders({
            Authorization: session.getIdToken().getJwtToken(),
          }),
        };

        this.httpClient
          .get(
            `${this.COMPARE_YOURSELF_URL}/compare-yourself/` +
              urlParam +
              queryParam,
            httpOptions
          )
          .subscribe({
            next: (res: any) => {
              if (res.errorType) {
                alert(res.errorMessage);
                return;
              }
              this.userSubject.next(res.data);
            },
            error: (err) => {
              alert(err || JSON.stringify(err.errorMessage));
            },
          });
      });
  }

  onDeleteData() {
    this.authService
      .getAuthenticatedUser()
      ?.getSession((err: any, session: any) => {
        if (err) {
          alert(err || JSON.stringify(err.error.message));
          return;
        }
        const httpOptions = {
          headers: new HttpHeaders({
            Authorization: session.getIdToken().getJwtToken(),
          }),
        };

        this.httpClient
          .delete(`${this.COMPARE_YOURSELF_URL}/compare-yourself`, httpOptions)
          .subscribe({
            next: (res) => {
              console.log({ res });
            },
            error: (err) => {
              alert(JSON.stringify(err.error.message));
            },
          });
      });
  }
}
