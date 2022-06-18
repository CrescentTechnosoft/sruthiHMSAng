import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { CommonService } from './services/common.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Router, NavigationStart, NavigationEnd, RouterEvent, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // changeDetection:ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  routeSubs$: Subscription;
  loading: boolean;

  constructor(private common: CommonService, private router: Router) { }

  ngOnInit(): void {
    this.loading = false;
    this.common.initApp();
    this.subscribeRouterNavigations();
  }

  //Triggers loading screen on Navigations
  subscribeRouterNavigations(): void {
    this.routeSubs$ = this.router.events.pipe(filter(e => e instanceof NavigationStart || e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError))
      .subscribe({
        next: (e: RouterEvent) => {
          this.changeOverLayStatus(e);
        }
      });
  }


  //Show / Hide Loading Screen
  changeOverLayStatus(e: RouterEvent) {
    if (e instanceof NavigationStart)
      this.loading = true;
    else
      this.loading = false;
  }

}
