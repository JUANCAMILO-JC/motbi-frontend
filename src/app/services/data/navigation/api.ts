import { Injectable } from '@angular/core';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { compactNavigation, defaultNavigation, customerNavigation, futuristicNavigation, horizontalNavigation } from 'app/services/data/navigation/data';
import { cloneDeep } from 'lodash-es';
import { UserService } from 'app/core/user/user.service';

@Injectable({providedIn: 'root'})
export class NavigationMockApi
{
    private readonly _compactNavigation: FuseNavigationItem[] = compactNavigation;
    private readonly _defaultNavigation: FuseNavigationItem[] = defaultNavigation;
    private readonly _customerNavigation: FuseNavigationItem[] = customerNavigation;
    private readonly _futuristicNavigation: FuseNavigationItem[] = futuristicNavigation;
    private readonly _horizontalNavigation: FuseNavigationItem[] = horizontalNavigation;
    private profile: any;
    private navigationUser: any

    /**
     * Constructor
     */
    constructor(
        private _fuseMockApiService: FuseMockApiService,
        private _userService: UserService
    ) {
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void {
        // -----------------------------------------------------------------------------------------------------
        // @ Navigation - GET
        // ----------------------------------------------------------------------------------------------------- 
        //this.navigationUser = cloneDeep(this._defaultNavigation);

        this._fuseMockApiService
            .onGet('api/common/navigation')
            .reply((request) => {
                
                this.profile = this._userService.getUserSysten();

                this.navigationUser = cloneDeep(this._defaultNavigation);
                if (this.profile) {

                    switch (this.profile.profile) {
                        case 1:

                            break;
                        case 4:
                            this.navigationUser = cloneDeep(this._customerNavigation);

                            break;

                        default:
                            break;
                    }

                }
                // Return the response
                return [
                    200,
                    {
                        compact: cloneDeep(this._compactNavigation),
                        default: this.navigationUser,
                        futuristic: cloneDeep(this._futuristicNavigation),
                        horizontal: cloneDeep(this._horizontalNavigation),
                    },
                ];
            });
    }
}
