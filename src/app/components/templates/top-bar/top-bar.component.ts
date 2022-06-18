import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  // styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  userName: string;
  newPassword: string;
  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
    this.userName = localStorage.getItem('user') ?? '';
  }

  ChangeBGColor(color: string): void {
    localStorage.setItem('CrescentBGColor', color);
    $('.background-All').css('background-color', color);
  }

  Logout(): void {
    this.auth.clearAuth();
    this.router.navigate(['']);
  }
}
