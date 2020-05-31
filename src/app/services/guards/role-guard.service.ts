import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, CanActivateChild } from '@angular/router';
import { AuthService } from './auth.service';
import Helpers from '../../helpers/helpers';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot) {
    const expectedRole = route.data.expectedRole;
    const data = Helpers.getUserData();

    if (!this.auth.isAuthenticated() || expectedRole !== data.roleId.toLowerCase()) {
      this.router.navigateByUrl('/auth');
      return false;
    }
    return true;
  }

}
