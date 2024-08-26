import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { PaymentOrder } from 'app/models/payment-order';

@Injectable({
  providedIn: 'root'
})
export class PaymentOrderService 
{
  private _odp: ReplaySubject<PaymentOrder> = new ReplaySubject<PaymentOrder>(1);
  private apiUrl = environment.apiUrl + "/api/odp";
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
    set advance(value: PaymentOrder)
    {   
        // Store the value
        this._odp.next(value);
    }

    get advance$(): Observable<PaymentOrder>
    {   
        return this._odp.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<PaymentOrder>
    {   
        return this._httpClient.get<PaymentOrder>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._odp.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: PaymentOrder): Observable<any>
    {
        return this._httpClient.post<PaymentOrder>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._odp.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: PaymentOrder): Observable<any>
    {
        return this._httpClient.put<PaymentOrder>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._odp.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: PaymentOrder): Observable<any>
    {
        return this._httpClient.delete<PaymentOrder>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._odp.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<PaymentOrder>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._odp.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAllByThird(id: number): Observable<any>
    {
        return this._httpClient.get<PaymentOrder>(`${this.apiUrl}/readAllByThird/` + id).pipe(
            tap((response) =>
            {
                this._odp.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getLastId(): Observable<any>
    {
        return this._httpClient.get<PaymentOrder>(`${this.apiUrl}/getLastId`).pipe(
            tap((response) =>
            {
                this._odp.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param object
     */
    updateStatus(object: PaymentOrder): Observable<any>
    {
        return this._httpClient.put<PaymentOrder>(`${this.apiUrl}/updateStatus`, object).pipe(
            tap((response) =>
            {
                this._odp.next(response);
            }),
        );
    }
}