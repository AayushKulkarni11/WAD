import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userName: string = '';
  userEmail: string = '';
  nameInitial: string = '';
  joinDate: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.userName  = localStorage.getItem('name')  || 'User';
    this.userEmail = localStorage.getItem('email') || '';
    this.nameInitial = this.userName.charAt(0).toUpperCase();
    this.joinDate = new Date().toLocaleDateString('en-IN', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    this.router.navigate(['login']);
  }
}
