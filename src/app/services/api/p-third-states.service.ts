import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { PThirdState } from 'app/interfaces/p-third-state';

@Injectable({
  providedIn: 'root'
})
export class PThirdStatesService 
{
    private _p_thirdState: ReplaySubject<PThirdState> = new ReplaySubject<PThirdState>(1);
    private apiUrl = environment.apiUrl + "/api/p_ThirdStates";
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
    set advance(value: PThirdState)
    {   
        // Store the value
        this._p_thirdState.next(value);
    }

    get advance$(): Observable<PThirdState>
    {   
        return this._p_thirdState.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<PThirdState>
    {   
        return this._httpClient.get<PThirdState>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._p_thirdState.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: PThirdState): Observable<any>
    {
        return this._httpClient.post<PThirdState>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._p_thirdState.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: PThirdState): Observable<any>
    {
        return this._httpClient.put<PThirdState>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._p_thirdState.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: PThirdState): Observable<any>
    {
        return this._httpClient.delete<PThirdState>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._p_thirdState.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<PThirdState>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._p_thirdState.next(response);
            }),
        );
    }
}