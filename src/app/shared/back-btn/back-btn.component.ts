import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, ActivatedRoute, Router  } from '@angular/router';

@Component({
  selector: 'app-back-btn',
  templateUrl: './back-btn.component.html',
  styleUrls: ['./back-btn.component.scss'],
  standalone: true,
  imports: [MatIconModule,RouterLink]
})
export class BackBtnComponent {

}
