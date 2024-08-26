import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, map, tap } from 'rxjs';
import { ChargeOrder } from 'app/models/charge-order';

@Injectable({
    providedIn: 'root'
})
export class ChargeOrderService {
    private _odc: ReplaySubject<ChargeOrder> = new ReplaySubject<ChargeOrder>(1);
    private apiUrl = environment.apiUrl + "/api/odc";
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter
     *
     * @param value
     */
    set advance(value: ChargeOrder) {
        // Store the value
        this._odc.next(value);
    }

    get advance$(): Observable<ChargeOrder> {
        return this._odc.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<any> {
        return this._httpClient.get<ChargeOrder>(`${this.apiUrl}/` + id);
    }

    /**
     * Create
     *
     * @param object
     */
    create(object: ChargeOrder): Observable<any> {
        return this._httpClient.post<ChargeOrder>(`${this.apiUrl}`, object).pipe(
            tap((response) => {
                this._odc.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: ChargeOrder): Observable<any> {
        return this._httpClient.put<ChargeOrder>(`${this.apiUrl}`, object).pipe(
            tap((response) => {
                this._odc.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: ChargeOrder): Observable<any> {
        return this._httpClient.delete<ChargeOrder>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) => {
                this._odc.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any> {
        return this._httpClient.get<ChargeOrder>(`${this.apiUrl}`).pipe(
            tap((response) => {
                this._odc.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getOdcByRequest(id: number): Observable<any> {
        return this._httpClient.get<ChargeOrder>(`${this.apiUrl}/OdcByRequest/` + id).pipe(
            tap((response) => {
                this._odc.next(response);
            }),
        );
    }

    /**
    * Get all by date range
    */
    getAllByRange(object: any): Observable<any> {
        return this._httpClient.post<Request>(`${this.apiUrl}/readAllByDateRange/`, object);
    }
}