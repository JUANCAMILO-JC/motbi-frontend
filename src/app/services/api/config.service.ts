import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { Config } from 'app/interfaces/config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService 
{
    private _config: ReplaySubject<Config> = new ReplaySubject<Config>(1);
    private apiUrl = environment.apiUrl + "/api/config";
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
    set advance(value: Config)
    {   
        // Store the value
        this._config.next(value);
    }

    get advance$(): Observable<Config>
    {   
        return this._config.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<Config>
    {   
        return this._httpClient.get<Config>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._config.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: Config): Observable<any>
    {
        return this._httpClient.post<Config>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._config.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: Config): Observable<any>
    {
        return this._httpClient.put<Config>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._config.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: Config): Observable<any>
    {
        return this._httpClient.delete<Config>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._config.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<Config>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._config.next(response);
            }),
        );
    }
}