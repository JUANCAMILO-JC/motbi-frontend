import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { CompanyAccount } from 'app/models/company-account';

@Injectable({
  providedIn: 'root'
})
export class CompanyAccountsService
{
    private _account: ReplaySubject<CompanyAccount> = new ReplaySubject<CompanyAccount>(1);
    private apiUrl = environment.apiUrl + "/api/accounts";
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
    set advance(value: CompanyAccount)
    {   
        // Store the value
        this._account.next(value);
    }

    get advance$(): Observable<CompanyAccount>
    {   
        return this._account.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<CompanyAccount>
    {   
        return this._httpClient.get<CompanyAccount>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._account.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: CompanyAccount): Observable<any>
    {
        return this._httpClient.post<CompanyAccount>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._account.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: CompanyAccount): Observable<any>
    {
        return this._httpClient.put<CompanyAccount>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._account.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: CompanyAccount): Observable<any>
    {
        return this._httpClient.delete<CompanyAccount>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._account.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<CompanyAccount>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._account.next(response);
            }),
        );
    }
}