import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, map, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class VehicleInspectionService 
{
    private _advance: ReplaySubject<any> = new ReplaySubject<any>(1);
    private apiUrl = environment.apiUrl + "/api/cars_inspeccion";
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
    set inspection(value: any)
    {   
        // Store the value
        this._advance.next(value);
    }

    get inspection$(): Observable<any>
    {   
        return this._advance.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<any>
    {   
        return this._httpClient.get<any>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._advance.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: any): Observable<any>
    {
        return this._httpClient.post<any>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._advance.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: any): Observable<any>
    {
        return this._httpClient.put<any>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._advance.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param any
     */
    delete(object: any): Observable<any>
    {
        return this._httpClient.delete<any>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._advance.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<any>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._advance.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAllByUser(id: number): Observable<any>
    {
        return this._httpClient.get<any>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._advance.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getByCar(id: number): Observable<any>
    {
        return this._httpClient.get<any>(`${this.apiUrl}/getByCar/` + id).pipe(
            tap((response) =>
            {
                this._advance.next(response);
            }),
        );
    }

}
