import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, Routes } from '@angular/router';

import { catchError, throwError } from 'rxjs';
import { DetailsUserComponent } from './details/details.component';
import { UsersComponent } from './users.component';
import { AccessGuard } from 'app/core/auth/guards/acces.guard';
import { UserService } from 'app/core/user/user.service';

/**
 * Course resolver
 *
 * @param route
 * @param state
 */
const userResolver = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
{
    const userService = inject(UserService);
    const router = inject(Router);

    return userService.getUser(parseInt(route.paramMap.get('id'))).pipe(
        // Error here means the requested course is not available
        catchError((error) =>
        {
            // Log the error
            console.error(error);

            // Get the parent url
            const parentUrl = state.url.split('/').slice(0, -1).join('/');

            // Navigate to there
            router.navigateByUrl(parentUrl);

            // Throw an error
            return throwError(() => new Error(error));
        }),
    );
};

export default [
    {
        path     : '',
        component: UsersComponent,
        canActivateChild: [AccessGuard],
        children : [
            {
                path     : '',
                pathMatch: 'full',
                component: UsersComponent,
            },
            {
                path     : 'new-user',
                component: DetailsUserComponent,
                data: {
                    //rol: x
                },
            },
            {
                path     : ':id',
                component: DetailsUserComponent,
                data: {
                    //rol: x
                },
                resolve  : {
                    user: userResolver,
                },
            },
        ],
    },
] as Routes;
