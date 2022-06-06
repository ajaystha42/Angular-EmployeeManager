import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-confirm-user',
  templateUrl: './confirm-user.component.html',
  styleUrls: ['./confirm-user.component.css'],
})
export class ConfirmUserComponent implements OnInit {
  @ViewChild('confirmForm', { static: true }) confirmForm: NgForm;

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {}
  onConfirmForm(form: NgForm) {
    if (form.invalid) return;
    const value: { username: string; verificationCode: string } = form.value;
    console.log({ value });
    this.authService.confirmUser(value.username, value.verificationCode);
  }
}
