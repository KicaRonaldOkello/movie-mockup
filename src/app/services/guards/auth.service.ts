import { Injectable } from '@angular/core';
import * as moment from 'moment';

import Helpers from '../../helpers/helpers';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  public isAuthenticated(returnUrl?: string) {
    const data = Helpers.getUserData();
    
    if (!data) {
      this.router.navigate(['/auth'], { state: { returnUrl } });
      return false;
    }
    const expiryDate = data.authToken.expiryDateUtc;
    const now = moment();

    if (now.isBefore(moment(expiryDate))) {
      return true;
    } else {
      Helpers.deleteUserData();
      return false;
    }
  }
}
