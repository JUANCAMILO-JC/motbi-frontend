import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { PFiscalRegimes } from 'app/interfaces/p-fiscal-regimes';

@Injectable({
  providedIn: 'root'
})
export class PFiscalRegimesService 
{
    private _p_fiscalRegimes: ReplaySubject<PFiscalRegimes> = new ReplaySubject<PFiscalRegimes>(1);
    private apiUrl = environment.apiUrl + "/api/p_FiscalRegimes";
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
    set advance(value: PFiscalRegimes)
    {   
        // Store the value
        this._p_fiscalRegimes.next(value);
    }

    get advance$(): Observable<PFiscalRegimes>
    {   
        return this._p_fiscalRegimes.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<PFiscalRegimes>
    {   
        return this._httpClient.get<PFiscalRegimes>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._p_fiscalRegimes.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: PFiscalRegimes): Observable<any>
    {
        return this._httpClient.post<PFiscalRegimes>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._p_fiscalRegimes.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: PFiscalRegimes): Observable<any>
    {
        return this._httpClient.put<PFiscalRegimes>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._p_fiscalRegimes.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: PFiscalRegimes): Observable<any>
    {
        return this._httpClient.delete<PFiscalRegimes>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._p_fiscalRegimes.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<PFiscalRegimes>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._p_fiscalRegimes.next(response);
            }),
        );
    }
}