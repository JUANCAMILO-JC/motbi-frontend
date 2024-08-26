import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, map, tap } from 'rxjs';
import { CashReceipt } from 'app/models/cash-receipt';

@Injectable({
  providedIn: 'root'
})
export class CarshReceiptService 
{
    private _cashReceipt: ReplaySubject<any> = new ReplaySubject<any>(1);
    private apiUrl = environment.apiUrl + "/api/cash_receipts";
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
    set advance(value: any)
    {   
        // Store the value
        this._cashReceipt.next(value);
    }

    get advance$(): Observable<any>
    {   
        return this._cashReceipt.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<CashReceipt> 
    {   
        return this._httpClient.get<any>(`${this.apiUrl}/` + id).pipe(
            tap(cashReceipt => {
                this._cashReceipt.next(cashReceipt);
            })
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: CashReceipt): Observable<any>
    {
        return this._httpClient.post<CashReceipt>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._cashReceipt.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: CashReceipt): Observable<any>
    {
        return this._httpClient.put<CashReceipt>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._cashReceipt.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: CashReceipt): Observable<any>
    {
        return this._httpClient.delete<CashReceipt>(`${this.apiUrl}/eliminarRecibo` + object).pipe(
            tap((response) =>
            {
                this._cashReceipt.next(response);
            }),
        );
    }

    /**
     * Delete one
     *
     * @param advance
     */
    deleteOne(object: CashReceipt): Observable<any>
    {
        return this._httpClient.post<CashReceipt>(`${this.apiUrl}/eliminarRecibo`, object).pipe(
            tap((response) =>
            {
                this._cashReceipt.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<CashReceipt>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._cashReceipt.next(response);
            }),
        );
    }

    /**
     * Get all by User
     */
    getAllByUser(id: number): Observable<any>
    {
        return this._httpClient.get<CashReceipt>(`${this.apiUrl}/readAllByThird/` + id).pipe(
            tap((response) =>
            {
                this._cashReceipt.next(response);
            }),
        );
    }

    /**
     * Get 
     */
    getByBill(id: number): Observable<any>
    {
        return this._httpClient.get<CashReceipt>(`${this.apiUrl}/readOneByBill/` + id).pipe(
            tap((response) =>
            {
                this._cashReceipt.next(response);
            }),
        );
    }
}