import { NgModule } from '@angular/core';
import { CommonModule, AsyncPipe, CurrencyPipe, NgIf, NgFor  } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';
import { HeaderTittleComponent } from './header-tittle/header-tittle.component';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';


@NgModule({
 imports:      [ CommonModule, AsyncPipe, CurrencyPipe, HeaderTittleComponent, ToastrModule.forRoot(), NgIf, NgFor, ImageDialogComponent ],
 declarations: [ ],
 exports:      [ CommonModule, AsyncPipe, CurrencyPipe, FormsModule, HeaderTittleComponent, ToastrModule, NgIf, NgFor, ImageDialogComponent ]
})
export class SharedModule {

}