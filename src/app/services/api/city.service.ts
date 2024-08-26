import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { City } from 'app/models/city';

@Injectable({
  providedIn: 'root'
})
export class CityService 
{
    private _city: ReplaySubject<City> = new ReplaySubject<City>(1);
    private apiUrl = environment.apiUrl + "/api/cities";
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
    set advance(value: City)
    {   
        // Store the value
        this._city.next(value);
    }

    get advance$(): Observable<City>
    {   
        return this._city.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<City>
    {   
        return this._httpClient.get<City>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._city.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: City): Observable<any>
    {
        return this._httpClient.post<City>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._city.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: City): Observable<any>
    {
        return this._httpClient.put<City>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._city.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: City): Observable<any>
    {
        return this._httpClient.delete<City>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._city.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<City>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._city.next(response);
            }),
        );
    }

    /**
     * Get all cities by department
     */
    getCityByDepartment(id: number): Observable<any>
    {
        return this._httpClient.get<City>(`${this.apiUrl}/getCitiesByDepartment/` + id).pipe(
            tap((response) =>
            {
                this._city.next(response);
            }),
        );
    }
}