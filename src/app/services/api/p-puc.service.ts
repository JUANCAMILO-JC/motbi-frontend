import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { PPuc } from 'app/models/p-puc';

@Injectable({
  providedIn: 'root'
})
export class PPucService {
  private _p_puc: ReplaySubject<PPuc> = new ReplaySubject<PPuc>(1);
  private apiUrl = environment.apiUrl + "/api/pucs"; //pendiente ruta

  constructor(private _httpClient: HttpClient) { }

  // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter
     *
     * @param value
     */
    set advance(value: PPuc)
    {   
        // Store the value
        this._p_puc.next(value);
    }

    get advance$(): Observable<PPuc>
    {   
        return this._p_puc.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<PPuc>
    {   
        return this._httpClient.get<PPuc>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._p_puc.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: PPuc): Observable<any>
    {
        return this._httpClient.post<PPuc>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._p_puc.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: PPuc): Observable<any>
    {
        return this._httpClient.put<PPuc>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._p_puc.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: PPuc): Observable<any>
    {
        return this._httpClient.delete<PPuc>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._p_puc.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<PPuc>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._p_puc.next(response);
            }),
        );
    }
}
