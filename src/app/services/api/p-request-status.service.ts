import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { PRequestStatus } from 'app/interfaces/p-request-status';

@Injectable({
  providedIn: 'root'
})
export class PRequestStatusService 
{
    private _p_requestStatus: ReplaySubject<PRequestStatus> = new ReplaySubject<PRequestStatus>(1);
    private apiUrl = environment.apiUrl + "/api/p_requestStatus";
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
    set advance(value: PRequestStatus)
    {   
        // Store the value
        this._p_requestStatus.next(value);
    }

    get advance$(): Observable<PRequestStatus>
    {   
        return this._p_requestStatus.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<PRequestStatus>
    {   
        return this._httpClient.get<PRequestStatus>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._p_requestStatus.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: PRequestStatus): Observable<any>
    {
        return this._httpClient.post<PRequestStatus>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._p_requestStatus.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: PRequestStatus): Observable<any>
    {
        return this._httpClient.put<PRequestStatus>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._p_requestStatus.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: PRequestStatus): Observable<any>
    {
        return this._httpClient.delete<PRequestStatus>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._p_requestStatus.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<PRequestStatus>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._p_requestStatus.next(response);
            }),
        );
    }
}