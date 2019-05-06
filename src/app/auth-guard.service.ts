import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { first, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const user = await this.getLoggedInUser()
    if (user !== undefined && user !== null) {
      return true
    } else {
      this.router.navigateByUrl('/')
      return false
    }
  }

  getLoggedInUser(): Promise<firebase.User> {
    return this.afAuth.authState.pipe(first()).toPromise()
  }
}
