import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { PTrailerMark } from 'app/interfaces/p-trailer-mark';

@Injectable({
  providedIn: 'root'
})
export class PTrailerMarksService 
{
    private _p_trailerMark: ReplaySubject<PTrailerMark> = new ReplaySubject<PTrailerMark>(1);
    private apiUrl = environment.apiUrl + "/api/p_TrailerMarks";
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
    set advance(value: PTrailerMark)
    {   
        // Store the value
        this._p_trailerMark.next(value);
    }

    get advance$(): Observable<PTrailerMark>
    {   
        return this._p_trailerMark.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<PTrailerMark>
    {   
        return this._httpClient.get<PTrailerMark>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._p_trailerMark.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: PTrailerMark): Observable<any>
    {
        return this._httpClient.post<PTrailerMark>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._p_trailerMark.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: PTrailerMark): Observable<any>
    {
        return this._httpClient.put<PTrailerMark>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._p_trailerMark.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: PTrailerMark): Observable<any>
    {
        return this._httpClient.delete<PTrailerMark>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._p_trailerMark.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<PTrailerMark>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._p_trailerMark.next(response);
            }),
        );
    }
}