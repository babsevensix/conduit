import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { authActions } from './auth.actions';
import { UserService } from '../../services/users.service';
import { switchMap, map, tap, catchError, of } from 'rxjs';
import { UserDtoUserEnvelope } from '../../models/users.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthEffects {
  actions$ = inject(Actions);

  userService = inject(UserService);
  router = inject(Router);

  toastrService = inject(ToastrService);

  signin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.signin),
      switchMap(({ email, password }) =>
        this.userService.login({ email, password }).pipe(
          map((user) => {
            if (user && user.user && user.user?.token !== '') {
              this.router.navigate(['/']);
              return authActions.signinsuccess({
                token: user.user?.token ?? '',
              });
            }

            return authActions.signinfailure();
          }),
          catchError(err=>of(authActions.signinfailure()))
        )
      )
    )
  );

  signInFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.signinfailure),
        tap(() => {
          this.toastrService.error('You cannot login');
        })
      ),
    { dispatch: false }
  );
}
