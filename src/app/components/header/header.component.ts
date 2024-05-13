import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { UserService } from '../../services/users.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectIsAuthenticated } from '../../store/auth/auth.reducer';
import { authActions } from '../../store/auth/auth.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  
})
export class HeaderComponent {

  store = inject(Store);

  isLoggedIn = toSignal(this.store.select(selectIsAuthenticated));

  onSignOut() {
    this.store.dispatch(authActions.signout());
  }
 
  //userService = inject(UserService);
}
