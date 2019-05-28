import { AuthenticationService } from './shared/authentication/authentication-service/authentication.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PitchibuteWebApp';

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  isWelcomePage(): boolean {
    return this.router.url !== '/welcome';
  }

  logout() {
    this.authService.signOut().then(() => this.router.navigateByUrl('/welcome'))
  }
}
