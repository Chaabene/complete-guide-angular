import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './../service/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  sub: Subscription;
  isAuthenticated = false;
  constructor(private authService: AuthService,private router:Router) { }


  ngOnInit(): void {
    this.sub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['']);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
