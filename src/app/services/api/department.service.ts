import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { Department } from 'app/models/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService 
{
    private _deparment: ReplaySubject<Department> = new ReplaySubject<Department>(1);
    private apiUrl = environment.apiUrl + "/api/departments";
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
    set advance(value: Department)
    {   
        // Store the value
        this._deparment.next(value);
    }

    get advance$(): Observable<Department>
    {   
        return this._deparment.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<Department>
    {   
        return this._httpClient.get<Department>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._deparment.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: Department): Observable<any>
    {
        return this._httpClient.post<Department>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._deparment.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: Department): Observable<any>
    {
        return this._httpClient.put<Department>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._deparment.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: Department): Observable<any>
    {
        return this._httpClient.delete<Department>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._deparment.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<Department>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._deparment.next(response);
            }),
        );
    }
}