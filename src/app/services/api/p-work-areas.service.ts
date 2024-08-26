import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PWorkAreasService 
{
  private apiUrl = environment.apiUrl + "/api/advance";
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
    // set advance(value: Advance)
    // {   
    //     // Store the value
    //     this._advance.next(value);
    // }

    // get advance$(): Observable<Advance>
    // {   
    //     return this._advance.asObservable();
    // }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    /* get(id: number): Observable<Advance>
    {   
        return this._httpClient.get<Advance>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._advance.next(response);
            }),
        );
    } */

    /**
     * Create
     *
     * @param user
     */
    /* create(object: Advance): Observable<any>
    {
        return this._httpClient.post<Advance>(`${this.apiUrl}`, {object}).pipe(
            map((response) =>
            {
                this._advance.next(response);
            }),
        );
    } */

    /**
     * Update
     *
     * @param user
     */
    /* update(object: Advance): Observable<any>
    {
        return this._httpClient.put<Advance>(`${this.apiUrl}`, {object}).pipe(
            map((response) =>
            {
                this._advance.next(response);
            }),
        );
    } */

    /**
     * Delete 
     *
     * @param advance
     */
    /* delete(object: Advance): Observable<any>
    {
        return this._httpClient.delete<Advance>(`${this.apiUrl}/` + object.id).pipe(
            map((response) =>
            {
                this._advance.next(response);
            }),
        );
    } */

    /**
     * Get all
     */
    /* getAll(): Observable<any>
    {
        return this._httpClient.get<Advance>(`${this.apiUrl}`).pipe(
            map((response) =>
            {
                this._advance.next(response);
            }),
        );
    } */
}