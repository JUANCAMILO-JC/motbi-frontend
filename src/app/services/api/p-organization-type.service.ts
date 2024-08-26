import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { POrganizationType } from 'app/models/p-organization-type';

@Injectable({
  providedIn: 'root'
})
export class POrganizationTypeService {
  private _p_organizationType: ReplaySubject<POrganizationType> = new ReplaySubject<POrganizationType>(1);
  private apiUrl = environment.apiUrl + "/api/p_TypeOrganizations"; //pendiente ruta

  constructor(private _httpClient: HttpClient) { }

  // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter
     *
     * @param value
     */
    set advance(value: POrganizationType)
    {   
        // Store the value
        this._p_organizationType.next(value);
    }

    get advance$(): Observable<POrganizationType>
    {   
        return this._p_organizationType.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<POrganizationType>
    {   
        return this._httpClient.get<POrganizationType>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._p_organizationType.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: POrganizationType): Observable<any>
    {
        return this._httpClient.post<POrganizationType>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._p_organizationType.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: POrganizationType): Observable<any>
    {
        return this._httpClient.put<POrganizationType>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._p_organizationType.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: POrganizationType): Observable<any>
    {
        return this._httpClient.delete<POrganizationType>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._p_organizationType.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<POrganizationType>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._p_organizationType.next(response);
            }),
        );
    }
}
