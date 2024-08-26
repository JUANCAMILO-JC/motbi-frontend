import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { PSatellite } from 'app/interfaces/p-satellite';

@Injectable({
  providedIn: 'root'
})
export class PSatelliteService 
{
    private _p_satellite: ReplaySubject<PSatellite> = new ReplaySubject<PSatellite>(1);
    private apiUrl = environment.apiUrl + "/api/satelital";
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
    set advance(value: PSatellite)
    {   
        // Store the value
        this._p_satellite.next(value);
    }

    get advance$(): Observable<PSatellite>
    {   
        return this._p_satellite.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<PSatellite>
    {   
        return this._httpClient.get<PSatellite>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._p_satellite.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: PSatellite): Observable<any>
    {
        return this._httpClient.post<PSatellite>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._p_satellite.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: PSatellite): Observable<any>
    {
        return this._httpClient.put<PSatellite>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._p_satellite.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: PSatellite): Observable<any>
    {
        return this._httpClient.delete<PSatellite>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._p_satellite.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<PSatellite>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._p_satellite.next(response);
            }),
        );
    }
}