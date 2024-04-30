import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { UserService } from '../../services/users.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  
})
export class HeaderComponent {
  onSignOut() {
    this.userService.Token = null;
  }
  // onSignIn() {
  //   this.navigationService.pageToView.set('Login');
  // }
  // onSignUp() {
  //   this.navigationService.pageToView.set('Register');
  // }
  navigationService = inject(NavigationService);
  userService = inject(UserService);
}
