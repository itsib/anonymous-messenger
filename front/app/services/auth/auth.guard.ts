import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private storage: StorageService, private router: Router) {}

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return this.performCheck();
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.performCheck();
  }

  private performCheck(): boolean {
    const canActivate = !!this.storage.getUser();
    if (!canActivate) {
      this.router.navigate(['/']);
    }
    return canActivate;
  }
}
