import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { of, switchMap } from 'rxjs';
import { UserService } from 'app/core/user/user.service';

export const AccessGuard : CanActivateFn | CanActivateChildFn = (route, state) =>
{
    const router: Router = inject(Router);
    const _userService: UserService = inject(UserService)

    // Get required rol from data object
    const requiredRole = route.data.rol;
    // Check the authentication status
    if (_userService.isInRoles(requiredRole)) 
    {
        //console.log("SI TIENE ACCESO")
        return true; // Permitir el acceso si el rol del usuario coincide

      } else 
      {
        // Redirigir a una página de acceso no autorizado
        //console.log("NO TIENE ACCESO")
        //router.navigate(['/unauthorized']);
        return true;
      }
};
