import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  isLoading = false;

  @ViewChild('signupForm', { static: true }) signupForm: NgForm;

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.isLoading = this.authService.getLoading();
    this.authService.getLoadingListener().subscribe({
      next: (loading: boolean) => (this.isLoading = loading),
      error: (err) => alert(err || JSON.stringify(err.message)),
    });
  }

  onFormSignup(form: NgForm) {
    this.isLoading = true;
    if (form.invalid) {
      // this.isLoading = false;
      return;
    }
    const value = form.value;
    this.authService.signUp(value);
  }
}
