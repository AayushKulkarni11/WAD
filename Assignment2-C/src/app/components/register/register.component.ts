import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  registerError: string = '';

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name:  ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  registerSubmit() {
    const { name, email } = this.registerForm.value;
    const usersRaw = localStorage.getItem('registeredUsers');
    const users: any[] = usersRaw ? JSON.parse(usersRaw) : [];
    const exists = users.find((u: any) => u.email === email);
    if (exists) {
      this.registerError = 'This email is already registered. Please login instead.';
      return;
    }
    users.push({ name, email });
    localStorage.setItem('registeredUsers', JSON.stringify(users));

    alert(`Account created for ${name}! You can now login.`);
    this.router.navigate(['login']);
  }

  gotoLogin() {
    this.router.navigate(['login']);
  }
}
