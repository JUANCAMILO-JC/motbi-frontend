import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { PEconomicActivities } from 'app/interfaces/p-economic-activities';

@Injectable({
  providedIn: 'root'
})
export class PEconomicActivitiesService 
{
    private _p_ecoActivities: ReplaySubject<PEconomicActivities> = new ReplaySubject<PEconomicActivities>(1);
    private apiUrl = environment.apiUrl + "/api/p_EconomicActivities";
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
    set advance(value: PEconomicActivities)
    {   
        // Store the value
        this._p_ecoActivities.next(value);
    }

    get advance$(): Observable<PEconomicActivities>
    {   
        return this._p_ecoActivities.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<PEconomicActivities>
    {   
        return this._httpClient.get<PEconomicActivities>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._p_ecoActivities.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: PEconomicActivities): Observable<any>
    {
        return this._httpClient.post<PEconomicActivities>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._p_ecoActivities.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: PEconomicActivities): Observable<any>
    {
        return this._httpClient.put<PEconomicActivities>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._p_ecoActivities.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: PEconomicActivities): Observable<any>
    {
        return this._httpClient.delete<PEconomicActivities>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._p_ecoActivities.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<PEconomicActivities>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._p_ecoActivities.next(response);
            }),
        );
    }
}