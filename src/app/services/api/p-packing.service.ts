import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { PPacking } from 'app/interfaces/p-packing';

@Injectable({
  providedIn: 'root'
})
export class PPackingService 
{
    private _p_packing: ReplaySubject<PPacking> = new ReplaySubject<PPacking>(1);
    private apiUrl = environment.apiUrl + "/api/p_Packing";
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
    set advance(value: PPacking)
    {   
        // Store the value
        this._p_packing.next(value);
    }

    get advance$(): Observable<PPacking>
    {   
        return this._p_packing.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<PPacking>
    {   
        return this._httpClient.get<PPacking>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._p_packing.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: PPacking): Observable<any>
    {
        return this._httpClient.post<PPacking>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._p_packing.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: PPacking): Observable<any>
    {
        return this._httpClient.put<PPacking>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._p_packing.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: PPacking): Observable<any>
    {
        return this._httpClient.delete<PPacking>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._p_packing.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<PPacking>(`${this.apiUrl}`)
    }
}