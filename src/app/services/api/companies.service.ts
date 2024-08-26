import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { Companie } from 'app/models/companie';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService 
{
    private _city: ReplaySubject<Companie> = new ReplaySubject<Companie>(1);
    private apiUrl = environment.apiUrl + "/api/companies";
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
    set advance(value: Companie)
    {   
        // Store the value
        this._city.next(value);
    }

    get advance$(): Observable<Companie>
    {   
        return this._city.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<Companie>
    {   
        return this._httpClient.get<Companie>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._city.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: Companie): Observable<any>
    {
        return this._httpClient.post<Companie>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._city.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: Companie): Observable<any>
    {
        return this._httpClient.put<Companie>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._city.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: Companie): Observable<any>
    {
        return this._httpClient.delete<Companie>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._city.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<Companie>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._city.next(response);
            }),
        );
    }
}