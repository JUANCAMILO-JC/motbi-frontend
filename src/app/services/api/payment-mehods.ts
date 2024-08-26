import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { PaymentMethod } from 'app/models/payment-method';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodsService
{
    private _profile: ReplaySubject<PaymentMethod> = new ReplaySubject<PaymentMethod>(1);
    private apiUrl = environment.apiUrl + "/api/payment_methods";
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
    set advance(value: PaymentMethod)
    {   
        // Store the value
        this._profile.next(value);
    }

    get advance$(): Observable<PaymentMethod>
    {   
        return this._profile.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<PaymentMethod>
    {   
        return this._httpClient.get<PaymentMethod>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._profile.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: PaymentMethod): Observable<any>
    {
        return this._httpClient.post<PaymentMethod>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._profile.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: PaymentMethod): Observable<any>
    {
        return this._httpClient.put<PaymentMethod>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._profile.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: PaymentMethod): Observable<any>
    {
        return this._httpClient.delete<PaymentMethod>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._profile.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<PaymentMethod>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._profile.next(response);
            }),
        );
    }
}