import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { General } from 'app/interfaces/general';

@Injectable({
  providedIn: 'root'
})
export class GeneralService 
{
  private _general: ReplaySubject<General> = new ReplaySubject<General>(1);
  private apiUrl = environment.apiUrl + "/api/general";
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
    set advance(value: General)
    {   
        // Store the value
        this._general.next(value);
    }

    get advance$(): Observable<General>
    {   
        return this._general.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<General>
    {   
        return this._httpClient.get<General>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._general.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: General): Observable<any>
    {
        return this._httpClient.post<General>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._general.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: General): Observable<any>
    {
        return this._httpClient.put<General>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._general.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: General): Observable<any>
    {
        return this._httpClient.delete<General>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._general.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<General>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._general.next(response);
            }),
        );
    }

    /**
     * Get all by Father
     */
    getAllFather(id: number): Observable<any>
    {
        return this._httpClient.get<General>(`${this.apiUrl}`+ '/father/' + id);
    }
}