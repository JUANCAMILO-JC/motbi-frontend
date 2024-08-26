import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { Comply } from 'app/models/comply';

@Injectable({
  providedIn: 'root'
})
export class ComplyService 
{
    private _comply: ReplaySubject<Comply> = new ReplaySubject<Comply>(1);
    private apiUrl = environment.apiUrl + "/api/comply";
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
    set advance(value: Comply)
    {   
        // Store the value
        this._comply.next(value);
    }

    get advance$(): Observable<Comply>
    {   
        return this._comply.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<any>
    {   
        return this._httpClient.get<Comply>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._comply.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: Comply): Observable<any>
    {
        return this._httpClient.post<Comply>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._comply.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: Comply): Observable<any>
    {
        return this._httpClient.put<Comply>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._comply.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: Comply): Observable<any>
    {
        return this._httpClient.delete<Comply>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._comply.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<Comply>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._comply.next(response);
            }),
        );
    }

    /**
     * Get all by Third
     */
    getAllByThird(id: number): Observable<any>
    {
        return this._httpClient.get<Comply>(`${this.apiUrl}` + /readAllByThird/ + id).pipe(
            tap((response) =>
            {
                this._comply.next(response);
            }),
        );
    }

    /**
    * Get all by date range
    */
    getAllByRange(object: any): Observable<any> {
        
        return this._httpClient.post<any>(`${this.apiUrl}/readAllByDateRange/`, object);
    }

    /**
    * Get all by date range
    */
    sendComplyToRNDC(object: any): Observable<any> {
        
        return this._httpClient.post<any>(`${this.apiUrl}/sendComplyToRNDC`, object);
    }
}