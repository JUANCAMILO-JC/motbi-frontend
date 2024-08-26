import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { PAccountType } from 'app/interfaces/p-account-type';

@Injectable({
  providedIn: 'root'
})
export class PAccountTypesService 
{
    private _p_acountType: ReplaySubject<PAccountType> = new ReplaySubject<PAccountType>(1);
    private apiUrl = environment.apiUrl + "/api/p_TypeAccounts";
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
    set advance(value: PAccountType)
    {   
        // Store the value
        this._p_acountType.next(value);
    }

    get advance$(): Observable<PAccountType>
    {   
        return this._p_acountType.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<PAccountType>
    {   
        return this._httpClient.get<PAccountType>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._p_acountType.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: PAccountType): Observable<any>
    {
        return this._httpClient.post<PAccountType>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._p_acountType.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: PAccountType): Observable<any>
    {
        return this._httpClient.put<PAccountType>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._p_acountType.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: PAccountType): Observable<any>
    {
        return this._httpClient.delete<PAccountType>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._p_acountType.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<PAccountType>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._p_acountType.next(response);
            }),
        );
    }
}