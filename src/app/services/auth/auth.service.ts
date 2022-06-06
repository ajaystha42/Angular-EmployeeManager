import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';
import { Observable, Observer, Subject } from 'rxjs';
import { User } from 'src/app/model/User';

const POOL_DATA = {
  //from general setting of user pool
  UserPoolId: 'us-east-1_XaJg57Gx0',
  // from appclients of user pool
  ClientId: '43u518vildoojj6sau0ismjq85',
};
const userPool = new CognitoUserPool(POOL_DATA);

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  registeredUser: CognitoUser;
  private isAuthenticated = false;
  private isLoading = false;
  private authListener = new Subject<boolean>();
  private loadingListener = new Subject<boolean>();

  verifyAuthentication() {
    return this.isAuthenticated;
  }

  getAuthListener() {
    return this.authListener.asObservable();
  }

  getLoading() {
    return this.isLoading;
  }

  getLoadingListener() {
    return this.loadingListener.asObservable();
  }

  getAuthenticatedUser() {
    return userPool.getCurrentUser();
  }

  logout() {
    this.getAuthenticatedUser()?.signOut();
    this.authListener.next(false);
  }

  //auto login
  autoLogin(): Observable<any> {
    const user = this.getAuthenticatedUser();
    const obs = new Observable((observer) => {
      if (!user) {
        this.authListener.next(false);
        observer.next(false);
      } else {
        //checking in aws if tokens are valid,
        // will give new token using refresh token if needed
        user.getSession((err: any, session: any) => {
          if (err) {
            this.authListener.next(false);
            observer.next(false);
          } else {
            if (session.isValid()) {
              this.authListener.next(true);
              observer.next(true);
            } else {
              this.authListener.next(false);
              observer.next(false);
            }
          }
        });
      }
      observer.complete();
    });
    return obs;
  }

  signUp(formUser: User) {
    const user: User = formUser;
    const attributeList: CognitoUserAttribute[] = [];
    //setting up email - other alias attribute in cognito
    const emailAttribute = {
      Name: 'email',
      Value: user.email,
    };
    attributeList.push(new CognitoUserAttribute(emailAttribute));
    userPool.signUp(
      user.username,
      user.password,
      attributeList,
      null || [],
      (err, result) => {
        if (err) {
          this.loadingListener.next(false);
          alert(err.message || JSON.stringify(err));
          return;
        }
        if (result) {
          this.loadingListener.next(false);
          this.registeredUser = result.user;
          this.router.navigate(['/confirm-user']);
        }
      }
    );
  }

  confirmUser(username: string, verificationCode: string) {
    this.loadingListener.next(true);
    const userData = {
      Username: username,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(verificationCode, true, (err, result) => {
      if (err) {
        alert(err.message || JSON.stringify(err));
        this.loadingListener.next(false);
        return;
      }
      if (result) this.router.navigate(['/login']);
    });
  }

  login(username: string, password: string) {
    this.loadingListener.next(true);
    const authData = {
      Username: username,
      Password: password,
    };
    const authDetails = new AuthenticationDetails(authData);
    const userData = {
      Username: username,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    const that = this;
    cognitoUser.authenticateUser(authDetails, {
      onSuccess(result: CognitoUserSession) {
        that.isAuthenticated = true;
        that.authListener.next(true);
        that.router.navigate(['/']);
      },
      onFailure(err) {
        alert(err.message || JSON.stringify(err));
        that.loadingListener.next(false);
        return;
      },
    });
  }
}
