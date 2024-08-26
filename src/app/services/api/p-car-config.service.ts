import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { PCarConfig } from 'app/interfaces/p-car-config';

@Injectable({
  providedIn: 'root'
})
export class PCarConfigService 
{
    private _p_carConfig: ReplaySubject<PCarConfig> = new ReplaySubject<PCarConfig>(1);
    private apiUrl = environment.apiUrl + "/api/p_CarConfig";
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
    set advance(value: PCarConfig)
    {   
        // Store the value
        this._p_carConfig.next(value);
    }

    get advance$(): Observable<PCarConfig>
    {   
        return this._p_carConfig.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<PCarConfig>
    {   
        return this._httpClient.get<PCarConfig>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._p_carConfig.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: PCarConfig): Observable<any>
    {
        return this._httpClient.post<PCarConfig>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._p_carConfig.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: PCarConfig): Observable<any>
    {
        return this._httpClient.put<PCarConfig>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._p_carConfig.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: PCarConfig): Observable<any>
    {
        return this._httpClient.delete<PCarConfig>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._p_carConfig.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<PCarConfig>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._p_carConfig.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAllByCarType(id: number): Observable<any>
    {
        return this._httpClient.get<PCarConfig>(`${this.apiUrl}/getByType/` + id).pipe(
            tap((response) =>
            {
                this._p_carConfig.next(response);
            }),
        );
    }
}