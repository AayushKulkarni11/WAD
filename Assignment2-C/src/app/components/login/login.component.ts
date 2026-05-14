import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError: string = '';

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      name:  ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  loginSubmit() {
    const { name, email } = this.loginForm.value;
    const usersRaw = localStorage.getItem('registeredUsers');
    const users: any[] = usersRaw ? JSON.parse(usersRaw) : [];

    const found = users.find(
      (u: any) => u.name === name && u.email === email
    );

    if (found) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
      this.router.navigate(['home']);
    } else {
      this.loginError = 'Invalid name or email. Please check your credentials or register first.';
    }
  }

  gotoSignup() {
    this.router.navigate(['register']);
  }
}
