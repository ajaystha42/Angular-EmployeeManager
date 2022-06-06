import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'AWS Cognito';
  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    // this.authService.autoLogin();
  }
}
