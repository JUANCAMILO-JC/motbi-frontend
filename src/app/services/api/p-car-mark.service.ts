import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { PCarMark } from 'app/interfaces/p-car-mark';

@Injectable({
  providedIn: 'root'
})
export class PCarMarkService 
{
    private _p_carMark: ReplaySubject<PCarMark> = new ReplaySubject<PCarMark>(1);
    private apiUrl = environment.apiUrl + "/api/p_CarMark";
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
    set advance(value: PCarMark)
    {   
        // Store the value
        this._p_carMark.next(value);
    }

    get advance$(): Observable<PCarMark>
    {   
        return this._p_carMark.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<PCarMark>
    {   
        return this._httpClient.get<PCarMark>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._p_carMark.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: PCarMark): Observable<any>
    {
        return this._httpClient.post<PCarMark>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._p_carMark.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: PCarMark): Observable<any>
    {
        return this._httpClient.put<PCarMark>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._p_carMark.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: PCarMark): Observable<any>
    {
        return this._httpClient.delete<PCarMark>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._p_carMark.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<PCarMark>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._p_carMark.next(response);
            }),
        );
    }
}