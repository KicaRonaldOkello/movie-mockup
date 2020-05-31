import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import Helpers from 'src/app/helpers/helpers';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const returnUrl = state.url;

    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/auth'], { state: { returnUrl } });
      return false;
    }
    return true;
  }
}
