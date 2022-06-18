import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    return await this.auth.authenticateUser(next.data.page)
      .toPromise()
      .then(d => {
        if (d.status === 'Login') {
          this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
          return false;
        }
        else if (d.status === 'Restricted') {
          this.router.navigate(['/UnAuthorized']);
          return false;
        }
        else {
          if (d.isValidatedNow) {
            this.auth.isLoggedIn = true;
            this.auth.accessDatas = d.access;
          }
          return true;
        }
      })
      .catch((e: ErrorEvent) => { console.log(e.message); return false });
  }
}
