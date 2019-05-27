import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {first} from 'rxjs/operators';
import {User} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {
  constructor(private afAuth: AngularFireAuth, private router: Router) {
  }

  canLoad(route: Route): Promise<boolean> {
    return this.verifyUser();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.verifyUser();
  }

  async verifyUser() {
    const user = await this.getLoggedInUser();
    if (user !== undefined && user !== null) {
      return true;
    } else {
      this.router.navigate(['welcome']);
      return false;
    }
  }

  getLoggedInUser(): Promise<User> {
    return this.afAuth.authState.pipe(first()).toPromise();
  }
}
