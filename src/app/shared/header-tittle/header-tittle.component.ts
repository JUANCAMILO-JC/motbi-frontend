import { Component, ElementRef, EventEmitter, HostBinding, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { FormsModule, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { CommonModule, AsyncPipe, CurrencyPipe} from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { fuseAnimations } from '@fuse/animations/public-api';

import { Observable, Subject, debounceTime, map, of, startWith, takeUntil } from 'rxjs';
import { UserService } from 'app/core/user/user.service';

@Component({
    selector: 'app-header-tittle',
    templateUrl: './header-tittle.component.html',
    styleUrls: ['./header-tittle.component.scss'],
    animations   : fuseAnimations,
    standalone: true,
    imports      : [AsyncPipe, FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule, NgClass, NgFor, NgIf, NgTemplateOutlet, MatInputModule, MatFormFieldModule, MatDatepickerModule, MatAutocompleteModule]
})
export class HeaderTittleComponent {
    has_state_filter: boolean = false;
    
    @Input() tittle: string;
    @Input() stateFilter: boolean;
    @Output() refreshClicked = new EventEmitter<void>();
    @Output() removeClicked = new EventEmitter<void>();
    @Output() addClicked = new EventEmitter<void>();
    @Output() addStateFilter = new EventEmitter<string>();
    
    @Input() appearance: 'basic' | 'bar' = 'bar';
    @Input() debounce: number = 0;
    @Input() minLength: number = 2;
    @Output() search_filter: EventEmitter<any> = new EventEmitter<any>();
    @Output() date_filter: EventEmitter<any> = new EventEmitter<any>();
    
    @Input() states: any[] = [];
    opened: boolean = false;
    resultSets: any[];
    searchFilterControl: UntypedFormControl = new UntypedFormControl();
    dateFromFilterControl: UntypedFormControl = new UntypedFormControl();
    dateToFilterControl: UntypedFormControl = new UntypedFormControl();
    statusFilterControl: UntypedFormControl = new UntypedFormControl();
    pfl: any;
    dateFrom: Date;
    dateTo: Date;
    date: Date = new Date();
    States: any[] = [];
    filteredOptionsStates: Observable<any[]>

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
       * Constructor
       */
    constructor(
      private fb: FormBuilder,
      private _elementRef: ElementRef,
      private _userService: UserService
    )
    {
        this.pfl = this._userService.getTypeProfile();
        this.dateTo = new Date();
        this.dateTo.setHours(0, 0, 0, 0);
        // Sumar 7 días
        this.dateTo.setDate(this.dateTo.getDate() + 7);
        
        
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Host binding for component classes
     */
    @HostBinding('class') get classList(): any
    {
        return {
            'search-appearance-bar'  : this.appearance === 'bar',
            'search-appearance-basic': this.appearance === 'basic',
            'search-opened'          : this.opened,
        };
    }

    /**
     * Setter for bar search input
     *
     * @param value
     */
    @ViewChild('barSearchFilterInput')
    set barSearchFilterInput(value: ElementRef)
    {
        // If the value exists, it means that the search input
        // is now in the DOM, and we can focus on the input..
        if ( value )
        {
            // Give Angular time to complete the change detection cycle
            setTimeout(() =>
            {
                value.nativeElement.focus();
                // Focus to the input element
            }, 300);
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On changes
     *
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void
    {
        // Appearance
        if ( 'appearance' in changes )
        {
            // To prevent any issues, close the
            // search after changing the appearance
            this.close();
        }
        if (changes.states && changes.states.currentValue) 
        {
            this.States = this.states;     

            this.setupAutocomplete(this.States)
        }
    }
    /**
     * On init
     */
    ngOnInit(): void {

        this.stateFilter && (this.has_state_filter = this.stateFilter);

        //this.dateFrom = new Date(this.date);
        this.date.setDate(this.date.getDate() - 30);
        // Establecer las horas, minutos, segundos y milisegundos a 0
        this.date.setHours(0, 0, 0, 0);

        this.dateFrom = this.date;
        
        this.dateFrom.setHours(0, 0, 0, 0);

        this.dateFromFilterControl.patchValue(this.dateFrom);

        this.dateToFilterControl.patchValue(this.dateTo);

        this.statusFilterControl.patchValue('');

        this.dateRangeFilter();


        

        if (!this.has_state_filter) {
            this.statusFilterControl.disable();
        }
        

        // Subscribe to the search field value changes
        this.searchFilterControl.valueChanges
            .pipe(
                debounceTime(this.debounce),
                takeUntil(this._unsubscribeAll),
                map((value) => {
                    // Set the resultSets to null if there is no value or
                    // the length of the value is smaller than the minLength
                    // so the autocomplete panel can be closed
                    if (!value || value.length < this.minLength) {
                        this.resultSets = null;
                    }

                    // Continue
                    return value;
                }),

                // Filter out undefined/null/false statements and also
                // filter out the values that are smaller than minLength

                //filter(value => value && value.length >= this.minLength),
            )
            .subscribe((value) => {

                this.search_filter.next(value);
            });
        // Subscribe to the date from field value changes    
        this.dateFromFilterControl.valueChanges
            .pipe(
                debounceTime(this.debounce),
                takeUntil(this._unsubscribeAll),
                map((value) => {
                    // Set the resultSets to null if there is no value or
                    // the length of the value is smaller than the minLength
                    // so the autocomplete panel can be closed
                    if (!value || value.length < this.minLength) {
                        this.resultSets = null;
                    }

                    // Continue
                    return value;
                }),

                // Filter out undefined/null/false statements and also
                // filter out the values that are smaller than minLength

                //filter(value => value && value.length >= this.minLength),
            )
            .subscribe(() => {
                this.dateRangeFilter();
                
            });

        this.dateToFilterControl.valueChanges
            .pipe(
                debounceTime(this.debounce),
                takeUntil(this._unsubscribeAll),
                map((value) => {
                    // Set the resultSets to null if there is no value or
                    // the length of the value is smaller than the minLength
                    // so the autocomplete panel can be closed
                    if (!value || value.length < this.minLength) {
                        this.resultSets = null;
                    }

                    // Continue
                    return value;
                }),

                // Filter out undefined/null/false statements and also
                // filter out the values that are smaller than minLength

                //filter(value => value && value.length >= this.minLength),
            )
            .subscribe(() => {
                this.dateRangeFilter();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * On keydown of the search input
     *
     * @param event
     */
    onKeydown(event: KeyboardEvent): void
    {
        // Escape
        if ( event.code === 'Escape' )
        {
            this.close();
        }
    }

    /**
     * Open the search
     * Used in 'bar'
     */
    open(): void
    {
        // Return if it's already opened
        if ( this.opened )
        {
            return;
        }

        // Open the search
        this.opened = true;
    }

    /**
     * Close the search
     * * Used in 'bar'
     */
    close(): void
    {
        // Return if it's already closed
        if ( !this.opened )
        {
            return;
        }

        // Clear the search input
        this.searchFilterControl.setValue('');
        this.statusFilterControl.setValue('');

        // Close the search
        this.opened = false;
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    refresh() {
      this.refreshClicked.emit();
    }

    remove() {
      this.removeClicked.emit();
    }

    add() {
      this.addClicked.emit();
    }

    dateRangeFilter(): any {
        const start = new Date(this.dateFromFilterControl.value);

        const end   = new Date(this.dateToFilterControl.value);

        const date_rangue = {star_date: start, end_date: end};

        this.dateFrom = start;

        this.dateTo = end;
        
        this.date_filter.emit(date_rangue);
        //return (date_rangue);
    }


    private setupAutocomplete(Status: any[]) {

        this.filteredOptionsStates = this.statusFilterControl!.valueChanges.pipe(
            startWith(''),

            map(value => {

                const name = typeof value === 'string' ? value : value?.name;
                if (name == '') 
                {
                    this.statusFilterControl!.reset;
                    this.addStateFilter.emit('');
                }

                return name ? this._filterproduct(name as string || '', Status) : this.States.slice();
            }),
        );

        this.statusFilterControl!.valueChanges.subscribe(
            value => {

                const name = Status.findIndex(item => item.name === value);

                if (name >= 0) {

                    this.addStateFilter.emit(value);
                }
            }
        );
    }

    private _filterproduct(value: string, States: any[]): any[] {

        const filterValue = value.toLowerCase();

        const filteredOptions = States.filter(option => option.name.toLowerCase().includes(filterValue));

        // Si no hay opciones coincidentes y el valor del input no es vacío, puedes borrarlo
        if (filteredOptions.length === 0 && value.trim() !== '') 
        {            
            this.statusFilterControl!.setValue('');
        }

        return filteredOptions
    }
}
