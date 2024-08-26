import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { PDocDriver } from 'app/interfaces/p-doc-driver';

@Injectable({
  providedIn: 'root'
})
export class PDocDriversService 
{
    private _p_docDriver: ReplaySubject<PDocDriver> = new ReplaySubject<PDocDriver>(1);
    private apiUrl = environment.apiUrl + "/api/p_DocDrivers";
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
    set advance(value: PDocDriver)
    {   
        // Store the value
        this._p_docDriver.next(value);
    }

    get advance$(): Observable<PDocDriver>
    {   
        return this._p_docDriver.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<PDocDriver>
    {   
        return this._httpClient.get<PDocDriver>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._p_docDriver.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: PDocDriver): Observable<any>
    {
        return this._httpClient.post<PDocDriver>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._p_docDriver.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: PDocDriver): Observable<any>
    {
        return this._httpClient.put<PDocDriver>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._p_docDriver.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: PDocDriver): Observable<any>
    {
        return this._httpClient.delete<PDocDriver>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._p_docDriver.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<PDocDriver>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._p_docDriver.next(response);
            }),
        );
    }
}