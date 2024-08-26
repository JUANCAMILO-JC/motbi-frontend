import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { PCarClass } from 'app/interfaces/p-car-class';

@Injectable({
  providedIn: 'root'
})
export class PCarClassService 
{
    private _p_carClass: ReplaySubject<PCarClass> = new ReplaySubject<PCarClass>(1);
    private apiUrl = environment.apiUrl + "/api/p_CarClass";
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
    set advance(value: PCarClass)
    {   
        // Store the value
        this._p_carClass.next(value);
    }

    get advance$(): Observable<PCarClass>
    {   
        return this._p_carClass.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<PCarClass>
    {   
        return this._httpClient.get<PCarClass>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._p_carClass.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: PCarClass): Observable<any>
    {
        return this._httpClient.post<PCarClass>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._p_carClass.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: PCarClass): Observable<any>
    {
        return this._httpClient.put<PCarClass>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._p_carClass.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: PCarClass): Observable<any>
    {
        return this._httpClient.delete<PCarClass>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._p_carClass.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<PCarClass>(`${this.apiUrl}`);
    }
}