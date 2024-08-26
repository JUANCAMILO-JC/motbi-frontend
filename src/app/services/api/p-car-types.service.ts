import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { PCarType } from 'app/interfaces/p-car-type';

@Injectable({
  providedIn: 'root'
})
export class PCarTypesService 
{
    private _p_carType: ReplaySubject<PCarType> = new ReplaySubject<PCarType>(1);
    private apiUrl = environment.apiUrl + "/api/p_CarTypes";
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
    set advance(value: PCarType)
    {   
        // Store the value
        this._p_carType.next(value);
    }

    get advance$(): Observable<PCarType>
    {   
        return this._p_carType.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<PCarType>
    {   
        return this._httpClient.get<PCarType>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._p_carType.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: PCarType): Observable<any>
    {
        return this._httpClient.post<PCarType>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._p_carType.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: PCarType): Observable<any>
    {
        return this._httpClient.put<PCarType>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._p_carType.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: PCarType): Observable<any>
    {
        return this._httpClient.delete<PCarType>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._p_carType.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<PCarType>(`${this.apiUrl}`)
    }
}