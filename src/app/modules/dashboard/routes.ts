import { Route } from "@angular/router"

import { AccessGuard } from "app/core/auth/guards/acces.guard";
import { DashboardComponent } from "./dashboard.component";
import { PanelComponent } from "./panel/panel.component";




export default [
    { 
        path: '', component: DashboardComponent 
    },

    {
        path: 'panel', component: PanelComponent,
        data: {
            //rol: x
        },
        canActivate: [AccessGuard],
        canActivateChild: [AccessGuard],
    },

] as Route[];