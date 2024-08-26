import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { PProductCode } from 'app/interfaces/p-product-code';

@Injectable({
  providedIn: 'root'
})
export class PProductCodesService 
{
    private _p_productCode: ReplaySubject<PProductCode> = new ReplaySubject<PProductCode>(1);
    private apiUrl = environment.apiUrl + "/api/p_ProductCodes";
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
    set advance(value: PProductCode)
    {   
        // Store the value
        this._p_productCode.next(value);
    }

    get advance$(): Observable<PProductCode>
    {   
        return this._p_productCode.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<any>
    {   
        return this._httpClient.get<PProductCode>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._p_productCode.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: PProductCode): Observable<any>
    {
        return this._httpClient.post<PProductCode>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._p_productCode.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: PProductCode): Observable<any>
    {
        return this._httpClient.put<PProductCode>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._p_productCode.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: PProductCode): Observable<any>
    {
        return this._httpClient.delete<PProductCode>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._p_productCode.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<PProductCode>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._p_productCode.next(response);
            }),
        );
    }

    /**
     * Get all codes products by classification
     */
    getAllByProductClassifications(id: number): Observable<any>
    {   
        return this._httpClient.get<PProductCode>(`${this.apiUrl}/readAllByProductClassifications/` + id )
    }
}