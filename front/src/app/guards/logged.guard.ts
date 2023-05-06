import { inject } from '@angular/core';
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from '../core/services/auth.service';

export const LoggedGuard: CanActivateFn = async () => {
    const router = inject(Router);
    const auth = inject(AuthService);

    const isLogged = !!(await auth.tryAutoLogin());

    if (!isLogged) { return router.parseUrl('/'); }

    return isLogged;
} 