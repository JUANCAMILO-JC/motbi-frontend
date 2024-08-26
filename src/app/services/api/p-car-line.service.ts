import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { PCarLine } from 'app/interfaces/p-car-line';

@Injectable({
  providedIn: 'root'
})
export class PCarLineService 
{
    private _p_carLine: ReplaySubject<PCarLine> = new ReplaySubject<PCarLine>(1);
    private apiUrl = environment.apiUrl + "/api/p_CarLine";
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
    set advance(value: PCarLine)
    {   
        // Store the value
        this._p_carLine.next(value);
    }

    get advance$(): Observable<PCarLine>
    {   
        return this._p_carLine.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<PCarLine>
    {   
        return this._httpClient.get<PCarLine>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._p_carLine.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: PCarLine): Observable<any>
    {
        return this._httpClient.post<PCarLine>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._p_carLine.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: PCarLine): Observable<any>
    {
        return this._httpClient.put<PCarLine>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._p_carLine.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: PCarLine): Observable<any>
    {
        return this._httpClient.delete<PCarLine>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._p_carLine.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<PCarLine>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._p_carLine.next(response);
            }),
        );
    }

    /**
     * Get all by car mark
     */
    getAllByMark(id: number): Observable<any>
    {
        return this._httpClient.get<PCarLine>(`${this.apiUrl}/getLineByMark/` + id).pipe(
            tap((response) =>
            {
                this._p_carLine.next(response);
            }),
        );
    }
}