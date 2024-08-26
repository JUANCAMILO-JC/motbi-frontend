import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService 
{
  private _chart;
  private apiUrl = environment.apiUrl + "/api/statistics";
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
    set advance(value)
    {   
        // Store the value
        this._chart.next(value);
    }

    /* get advance$(): Observable<>
    {   
        return this._chart.asObservable();
    } */

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    /* get(id: number): Observable<>
    {   
        return this._httpClient.get<>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._chart.next(response);
            }),
        );
    } */

    /**
     * Create
     *
     * @param user
     */
    /* create(object): Observable<any>
    {
        return this._httpClient.post<>(`${this.apiUrl}`, {object}).pipe(
            map((response) =>
            {
                this._chart.next(response);
            }),
        );
    } */

    /**
     * Update
     *
     * @param user
     */
    /* update(object: ): Observable<any>
    {
        return this._httpClient.put<>(`${this.apiUrl}`, {object}).pipe(
            map((response) =>
            {
                this._chart.next(response);
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
                this._chart.next(response);
            }),
        );
    } */

    /**
     * Get all
     */
   /*  getAll(): Observable<any>
    {
        return this._httpClient.get<Advance>(`${this.apiUrl}`).pipe(
            map((response) =>
            {
                this._chart.next(response);
            }),
        );
    } */
}