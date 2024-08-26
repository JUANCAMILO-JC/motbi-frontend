import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { PCarColor } from 'app/interfaces/p-car-color';

@Injectable({
  providedIn: 'root'
})
export class PCarColorsService
{
    private _p_carColor: ReplaySubject<PCarColor> = new ReplaySubject<PCarColor>(1);
    private apiUrl = environment.apiUrl + "/api/p_CarColors";
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
    set advance(value: PCarColor)
    {   
        // Store the value
        this._p_carColor.next(value);
    }

    get advance$(): Observable<PCarColor>
    {   
        return this._p_carColor.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<PCarColor>
    {   
        return this._httpClient.get<PCarColor>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._p_carColor.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param color
     */
    create(object: PCarColor): Observable<any>
    {
        return this._httpClient.post<PCarColor>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._p_carColor.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param color
     */
    update(object: PCarColor): Observable<any>
    {
        return this._httpClient.put<PCarColor>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._p_carColor.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: PCarColor): Observable<any>
    {
        return this._httpClient.delete<PCarColor>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._p_carColor.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<PCarColor>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._p_carColor.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param color
     */
    getColor(object: any): Observable<any>
    {
        return this._httpClient.post<PCarColor>(`${this.apiUrl}/readOneByName/`, object).pipe(
            tap((response) =>
            {
                this._p_carColor.next(response);
            }),
        );
    }
}