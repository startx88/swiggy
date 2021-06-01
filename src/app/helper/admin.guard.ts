import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { exhaustMap, map, take } from 'rxjs/operators';
import { IRole } from '../models/auth.model';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private authSrv: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authSrv.user.pipe(
      take(1),
      map((user) => {
        if (user?.role === IRole.admin) {
          return true;
        }
        this.router.navigate(['/auth'], {
          queryParams: { returnUrl: state.url },
        });
        return false;
      })
    );
  }
}
