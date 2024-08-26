import { CdkScrollable } from '@angular/cdk/scrolling';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FuseFindByKeyPipe } from '@fuse/pipes/find-by-key/find-by-key.pipe';
import { BehaviorSubject, combineLatest, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports        : [CdkScrollable, MatFormFieldModule, MatSelectModule, MatOptionModule, NgFor, MatIconModule, MatInputModule, MatSlideToggleModule, NgIf, NgClass, MatTooltipModule, MatProgressBarModule, MatButtonModule, RouterLink, FuseFindByKeyPipe],
})

export class DashboardComponent implements OnInit, OnDestroy {

  title: string;
  array: any;

  private userLogged: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();


  /**
    * Constructor
    */
  constructor(
    private router: Router,
    private route: ActivatedRoute,


  ) {

    
    //this.userLogged = this._userService.getUserSysten();
  }

  /**
   * On init
   */
  ngOnInit(): void {
    
    const data = [
      {
          id: 1,
          title: 'Cambio de Aceite',
          description: 'Cambio del aceite del motor de la motocicleta.',
          category: {
              slug: 'mantenimiento',
              title: 'Mantenimiento'
          },
          progress: {
              completed: 1
          },
          km: 26000
      },
      {
          id: 2,
          title: 'Reemplazo de Filtro de Aire',
          description: 'Cambio del filtro de aire del motor de la motocicleta.',
          category: {
              slug: 'mantenimiento',
              title: 'Mantenimiento'
          },
          progress: {
              completed: 0.5
          },
          km: 30000
      },
      {
          id: 3,
          title: 'Reparación de Frenos',
          description: 'Ajuste y reemplazo de frenos de la motocicleta.',
          category: {
              slug: 'reparacion',
              title: 'Reparación'
          },
          progress: {
              completed: 0.8
          },
          km: 50000
      },
      {
          id: 4,
          title: 'Compra de Neumáticos',
          description: 'Adquisición de dos neumáticos nuevos para la motocicleta.',
          category: {
              slug: 'compra',
              title: 'Compra'
          },
          progress: {
              completed: 1
          },
          km: 45000
      },
      {
          id: 5,
          title: 'Suministro de Combustible',
          description: 'Llenado del tanque de gasolina de la motocicleta.',
          category: {
              slug: 'combustible',
              title: 'Combustible'
          },
          progress: {
              completed: 1
          },
          km: 27000
      },
      {
          id: 6,
          title: 'Cambio de Batería',
          description: 'Reemplazo de la batería de la motocicleta.',
          category: {
              slug: 'mantenimiento',
              title: 'Mantenimiento'
          },
          progress: {
              completed: 0.6
          },
          km: 60000
      },
      {
          id: 7,
          title: 'Ajuste de Suspensión',
          description: 'Revisión y ajuste de la suspensión de la motocicleta.',
          category: {
              slug: 'reparacion',
              title: 'Reparación'
          },
          progress: {
              completed: 0.9
          },
          km: 55000
      },
      {
          id: 8,
          title: 'Compra de Aceite de Motor',
          description: 'Adquisición de aceite de motor para el cambio.',
          category: {
              slug: 'compra',
              title: 'Compra'
          },
          progress: {
              completed: 1
          },
          km: 29000
      },
      {
          id: 9,
          title: 'Llenado de Tanque de Gasolina',
          description: 'Reabastecimiento de gasolina para la motocicleta.',
          category: {
              slug: 'combustible',
              title: 'Combustible'
          },
          progress: {
              completed: 1
          },
          km: 32000
      },
      {
          id: 10,
          title: 'Reemplazo de Luces',
          description: 'Cambio de luces delanteras y traseras de la motocicleta.',
          category: {
              slug: 'reparacion',
              title: 'Reparación'
          },
          progress: {
              completed: 0.7
          },
          km: 47000
      },
      {
          id: 11,
          title: 'Compra de Filtro de Aceite',
          description: 'Adquisición de un nuevo filtro de aceite para la motocicleta.',
          category: {
              slug: 'compra',
              title: 'Compra'
          },
          progress: {
              completed: 1
          },
          km: 31000
      },
      {
          id: 12,
          title: 'Cambio de Correa de Distribución',
          description: 'Reemplazo de la correa de distribución de la motocicleta.',
          category: {
              slug: 'mantenimiento',
              title: 'Mantenimiento'
          },
          progress: {
              completed: 0.5
          },
          km: 75000
      },
      {
          id: 13,
          title: 'Reparación de Aire Acondicionado',
          description: 'Revisión y reparación del sistema de aire acondicionado (si aplica) en motocicleta.',
          category: {
              slug: 'reparacion',
              title: 'Reparación'
          },
          progress: {
              completed: 0.8
          },
          km: 50000
      },
      {
          id: 14,
          title: 'Compra de Bujías',
          description: 'Adquisición de bujías nuevas para la motocicleta.',
          category: {
              slug: 'compra',
              title: 'Compra'
          },
          progress: {
              completed: 1
          },
          km: 40000
      },
      {
          id: 15,
          title: 'Suministro de Combustible Premium',
          description: 'Llenado del tanque con gasolina premium.',
          category: {
              slug: 'combustible',
              title: 'Combustible'
          },
          progress: {
              completed: 1
          },
          km: 31000
      },
      {
          id: 16,
          title: 'Cambio de Escapamiento',
          description: 'Reemplazo del sistema de escape de la motocicleta.',
          category: {
              slug: 'mantenimiento',
              title: 'Mantenimiento'
          },
          progress: {
              completed: 0.6
          },
          km: 65000
      },
      {
          id: 17,
          title: 'Reparación de Transmisión',
          description: 'Revisión y reparación de la transmisión de la motocicleta.',
          category: {
              slug: 'reparacion',
              title: 'Reparación'
          },
          progress: {
              completed: 0.5
          },
          km: 70000
      },
      {
          id: 18,
          title: 'Compra de Limpiaparabrisas',
          description: 'Adquisición de limpiaparabrisas nuevos.',
          category: {
              slug: 'compra',
              title: 'Compra'
          },
          progress: {
              completed: 1
          },
          km: 33000
      },
      {
          id: 19,
          title: 'Suministro de Combustible Diesel',
          description: 'Llenado del tanque de diesel (si aplica).',
          category: {
              slug: 'combustible',
              title: 'Combustible'
          },
          progress: {
              completed: 1
          },
          km: 34000
      },
      {
          id: 20,
          title: 'Reemplazo de Ventilador de Radiador',
          description: 'Cambio del ventilador del radiador de la motocicleta.',
          category: {
              slug: 'mantenimiento',
              title: 'Mantenimiento'
          },
          progress: {
              completed: 0.7
          },
          km: 72000
      },
      {
          id: 21,
          title: 'Reparación de Dirección Hidráulica',
          description: 'Ajuste y reparación del sistema de dirección hidráulica (si aplica).',
          category: {
              slug: 'reparacion',
              title: 'Reparación'
          },
          progress: {
              completed: 0.9
          },
          km: 48000
      },
      {
          id: 22,
          title: 'Compra de Pastillas de Freno',
          description: 'Adquisición de pastillas de freno nuevas.',
          category: {
              slug: 'compra',
              title: 'Compra'
          },
          progress: {
              completed: 1
          },
          km: 40000
      },
      {
          id: 23,
          title: 'Suministro de Gasolina Regular',
          description: 'Llenado del tanque con gasolina regular.',
          category: {
              slug: 'combustible',
              title: 'Combustible'
          },
          progress: {
              completed: 1
          },
          km: 35000
      },
      {
          id: 24,
          title: 'Cambio de Termostato',
          description: 'Reemplazo del termostato del motor de la motocicleta.',
          category: {
              slug: 'mantenimiento',
              title: 'Mantenimiento'
          },
          progress: {
              completed: 0.5
          },
          km: 68000
      },
      {
          id: 25,
          title: 'Reparación de Escape',
          description: 'Reparación y ajuste del sistema de escape de la motocicleta.',
          category: {
              slug: 'reparacion',
              title: 'Reparación'
          },
          progress: {
              completed: 0.6
          },
          km: 49000
      },
    ]

    this.array = data;


  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------



  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------




}




