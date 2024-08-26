import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { PCarGas } from 'app/interfaces/p-car-gas';

@Injectable({
  providedIn: 'root'
})
export class PCarGasService 
{
    private _p_carGas: ReplaySubject<PCarGas> = new ReplaySubject<PCarGas>(1);
    private apiUrl = environment.apiUrl + "/api/p_CarGas";
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
    set advance(value: PCarGas)
    {   
        // Store the value
        this._p_carGas.next(value);
    }

    get advance$(): Observable<PCarGas>
    {   
        return this._p_carGas.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<PCarGas>
    {   
        return this._httpClient.get<PCarGas>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._p_carGas.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: PCarGas): Observable<any>
    {
        return this._httpClient.post<PCarGas>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._p_carGas.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: PCarGas): Observable<any>
    {
        return this._httpClient.put<PCarGas>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._p_carGas.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: PCarGas): Observable<any>
    {
        return this._httpClient.delete<PCarGas>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._p_carGas.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<PCarGas>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._p_carGas.next(response);
            }),
        );
    }
}