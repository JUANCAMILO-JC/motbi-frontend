import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { PTrailer } from 'app/interfaces/p-trailer';

@Injectable({
  providedIn: 'root'
})
export class PTrailersService 
{
    private _p_trailer: ReplaySubject<PTrailer> = new ReplaySubject<PTrailer>(1);
    private apiUrl = environment.apiUrl + "/api/p_Trailers";
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
    set advance(value: PTrailer)
    {   
        // Store the value
        this._p_trailer.next(value);
    }

    get advance$(): Observable<PTrailer>
    {   
        return this._p_trailer.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<PTrailer>
    {   
        return this._httpClient.get<PTrailer>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._p_trailer.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: PTrailer): Observable<any>
    {
        return this._httpClient.post<PTrailer>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._p_trailer.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: PTrailer): Observable<any>
    {
        return this._httpClient.put<PTrailer>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._p_trailer.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: PTrailer): Observable<any>
    {
        return this._httpClient.delete<PTrailer>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._p_trailer.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<PTrailer>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._p_trailer.next(response);
            }),
        );
    }
}