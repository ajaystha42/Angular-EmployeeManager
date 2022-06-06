import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoading = false;
  @ViewChild('loginForm', { static: true }) loginForm: NgForm;
  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.isLoading = this.authService.getLoading();
    this.authService.getLoadingListener().subscribe({
      next: (loading: boolean) => (this.isLoading = loading),
      error: (err) => alert(err || JSON.stringify(err.message)),
    });
  }

  onLogin(form: NgForm) {
    if (form.invalid) return;
    // this.isLoading = true;
    const value = form.value;
    this.authService.login(value.username, value.password);
  }
}
