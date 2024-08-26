import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  standalone: true,
  imports:     [RouterOutlet],
})
export class UsersComponent implements OnInit {

  /**
    * Constructor
    */
  constructor() {}

    
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  
  /**
   * On init
  */
  ngOnInit(): void {
    
  }


}
