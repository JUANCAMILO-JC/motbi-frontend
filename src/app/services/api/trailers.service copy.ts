import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { Trailer } from 'app/interfaces/trailer';

@Injectable({
  providedIn: 'root'
})
export class TrailersService 
{
    private _trailer: ReplaySubject<Trailer> = new ReplaySubject<Trailer>(1);
    private apiUrl = environment.apiUrl + "/api/trailers";
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
    set advance(value: Trailer)
    {   
        // Store the value
        this._trailer.next(value);
    }

    get advance$(): Observable<Trailer>
    {   
        return this._trailer.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<Trailer>
    {   
        return this._httpClient.get<Trailer>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._trailer.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: Trailer): Observable<any>
    {
        return this._httpClient.post<Trailer>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._trailer.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: Trailer): Observable<any>
    {
        return this._httpClient.put<Trailer>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._trailer.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: Trailer): Observable<any>
    {
        return this._httpClient.delete<Trailer>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._trailer.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<Trailer>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._trailer.next(response);
            }),
        );
    }

    /**
     * search
     *
     * @param placa_trailer
     */
    searchTrailer(object: Trailer): Observable<any>
    {
        return this._httpClient.post<Trailer>(`${this.apiUrl}/searchVehicle`, object).pipe(
            tap((response) =>
            {
                this._trailer.next(response);
            }),
        );
    }
}