import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { PInsurance } from 'app/interfaces/p-insurance';

@Injectable({
  providedIn: 'root'
})
export class PInsurancesService 
{
    private _p_insurance: ReplaySubject<PInsurance> = new ReplaySubject<PInsurance>(1);
    private apiUrl = environment.apiUrl + "/api/p_Insurances";
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
    set advance(value: PInsurance)
    {   
        // Store the value
        this._p_insurance.next(value);
    }

    get advance$(): Observable<PInsurance>
    {   
        return this._p_insurance.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<PInsurance>
    {   
        return this._httpClient.get<PInsurance>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._p_insurance.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: PInsurance): Observable<any>
    {
        return this._httpClient.post<PInsurance>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._p_insurance.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: PInsurance): Observable<any>
    {
        return this._httpClient.put<PInsurance>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._p_insurance.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: PInsurance): Observable<any>
    {
        return this._httpClient.delete<PInsurance>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._p_insurance.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<PInsurance>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._p_insurance.next(response);
            }),
        );
    }
}