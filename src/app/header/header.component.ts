import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.verifyAuthentication();
    this.authService.getAuthListener().subscribe({
      next: (isAuth: boolean) => {
        this.isAuthenticated = isAuth;
      },
      error: (err) => {
        console.log({ err });
      },
    });

    this.authService.autoLogin().subscribe({
      next: (isAuth: boolean) => {
        this.isAuthenticated = isAuth;
      },
      error: (err) => {
        console.log({ err });
      },
    });
  }

  logout() {
    this.authService.logout();
  }
}
