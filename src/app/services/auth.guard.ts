import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from './users.service';

// @Injectable({providedIn: 'root'})
// export class AuthGuard implements CanActivate{

//     private userService = inject(UserService);
//     private router = inject(Router);
//     constructor(){

//     }

//     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {

//         const isLogged = this.userService.Token != null;

//         if (!isLogged){
//             this.router.navigateByUrl('/global');
//         }
//         return isLogged;
//     }

// }

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const isLogged = userService.Token != null;

  if (!isLogged) {
    router.navigateByUrl('/sign-in');
  }
  return isLogged;
};
