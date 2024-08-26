import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, map, tap } from 'rxjs';
import { ApplyODC } from 'app/interfaces/apply-odc';

@Injectable({
  providedIn: 'root'
})
export class ApplyODCService 
{
    private _aplyODC: ReplaySubject<ApplyODC> = new ReplaySubject<ApplyODC>(1);
    private apiUrl = environment.apiUrl + "/api/apply_odc";
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
    set applyodc(value: ApplyODC)
    {   
        // Store the value
        this._aplyODC.next(value);
    }

    get applyodc$(): Observable<ApplyODC>
    {   
        return this._aplyODC.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<ApplyODC>
    {   
        return this._httpClient.get<ApplyODC>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._aplyODC.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: ApplyODC): Observable<any>
    {
        return this._httpClient.post<ApplyODC>(`${this.apiUrl}`, {object}).pipe(
            map((response) =>
            {
                this._aplyODC.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: ApplyODC): Observable<any>
    {
        return this._httpClient.put<ApplyODC>(`${this.apiUrl}`, {object}).pipe(
            map((response) =>
            {
                this._aplyODC.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: ApplyODC): Observable<any>
    {
        return this._httpClient.delete<ApplyODC>(`${this.apiUrl}/` + object.id).pipe(
            map((response) =>
            {
                this._aplyODC.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<ApplyODC>(`${this.apiUrl}`).pipe(
            map((response) =>
            {
                this._aplyODC.next(response);
            }),
        );
    }
}