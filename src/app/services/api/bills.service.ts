import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { Bill } from 'app/models/bill';

@Injectable({
  providedIn: 'root'
})
export class BillsService 
{
    private _bill: ReplaySubject<Bill> = new ReplaySubject<Bill>(1);
    private apiUrl = environment.apiUrl + "/api/bills";
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) 
    {

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter
     *
     * @param value
     */
    set advance(value: Bill)
    {   
        // Store the value
        this._bill.next(value);
    }

    get advance$(): Observable<Bill>
    {   
        return this._bill.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<Bill>
    {   
        return this._httpClient.get<Bill>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._bill.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: Bill): Observable<any>
    {
        return this._httpClient.post<Bill>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._bill.next(response);
            }),
        );
    }
    
    /**
     * Update
     *
     * @param user
     */
    update(object: Bill): Observable<any>
    {
        return this._httpClient.put<Bill>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._bill.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: Bill): Observable<any>
    {
        return this._httpClient.delete<Bill>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._bill.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<Bill>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._bill.next(response);
            }),
        );
    }

    /**
    * Get all by date range
    */
    getAllByRange(object: any): Observable<any> {
        
        return this._httpClient.post<Request>(`${this.apiUrl}/readAllByDateRange/`, object);
    }
    
    /**
     * Get all by Third
     */
    getAllByThird(id: number): Observable<any>
    {
        return this._httpClient.get<Bill>(`${this.apiUrl}` + /readAllByThird/ + id).pipe(
            tap((response) =>
            {
                this._bill.next(response);
            }),
        );
    }


    resendToAPIDian(object: Bill): Observable<any>
    {
        return this._httpClient.post<Bill>(`${this.apiUrl}/resendToAPIDian`, object).pipe(
            tap((response) =>
            {
                this._bill.next(response);
            }),
        );
    }

    sendToRNDC(object: Bill): Observable<any>
    {
        return this._httpClient.post<Bill>(`${this.apiUrl}/sendToRNDC`, object).pipe(
            tap((response) =>
            {
                this._bill.next(response);
            }),
        );
    }
}