import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, tap} from 'rxjs';
import { Properties } from 'app/interfaces/properties';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService 
{
    private _properties: ReplaySubject<Properties> = new ReplaySubject<Properties>(1);
    private apiUrl = environment.apiUrl + "/api/properties";
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
    set advance(value: Properties)
    {   
        // Store the value
        this._properties.next(value);
    }

    get advance$(): Observable<Properties>
    {   
        return this._properties.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<Properties>
    {   
        return this._httpClient.get<Properties>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._properties.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: Properties): Observable<any>
    {
        return this._httpClient.post<Properties>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._properties.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: Properties): Observable<any>
    {
        return this._httpClient.put<Properties>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._properties.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: Properties): Observable<any>
    {
        return this._httpClient.delete<Properties>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._properties.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<Properties>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._properties.next(response);
            }),
        );
    }

    /**
     * Get all By Profile
     */
    getAllByProfile(): Observable<any>
    {
        return this._httpClient.get<Properties>(`${this.apiUrl}/profiles`).pipe(
            tap((response) =>
            {
                this._properties.next(response);
            }),
        );
    }

    /**
     * Get all By Rol
     */
    getAllByRol(): Observable<any>
    {
        return this._httpClient.get<Properties>(`${this.apiUrl}/roles`).pipe(
            tap((response) =>
            {
                this._properties.next(response);
            }),
        );
    }


}