import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, map, tap } from 'rxjs';
import { Consignment } from 'app/models/consignment'; 

@Injectable({
  providedIn: 'root'
})
export class ConsignmentService 
{
    private _remesa: ReplaySubject<Consignment> = new ReplaySubject<Consignment>(1);
    private apiUrl = environment.apiUrl + "/api/remesa";
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
    set advance(value: Consignment)
    {   
        // Store the value
        this._remesa.next(value);
    }

    get advance$(): Observable<Consignment>
    {   
        return this._remesa.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<any>
    {   
        return this._httpClient.get<Consignment>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._remesa.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: Consignment): Observable<any>
    {
        return this._httpClient.post<Consignment>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._remesa.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: Consignment): Observable<any>
    {
        return this._httpClient.put<Consignment>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._remesa.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: Consignment): Observable<any>
    {
        return this._httpClient.delete<Consignment>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._remesa.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<Consignment>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._remesa.next(response);
            }),
        );
    }

    /**
    * Get all by date range
    */
    getAllByRange(object: any): Observable<any> {
        
        return this._httpClient.post<Request>(`${this.apiUrl}/readAllByDateRange/`, object);
    }

    /**
     * Get all by user id
     */
    getAllByUser(id: number): Observable<any>
    {
        return this._httpClient.get<Consignment>(`${this.apiUrl}/solicitudporusuario/` + id).pipe(
            tap((response) =>
            {
                this._remesa.next(response);
            }),
        );
    }
    /**
     * Get all when is no comply
     */
    getAllWhitoutComply(): Observable<any>
    {
        return this._httpClient.get<Consignment>(`${this.apiUrl}/readAllWhitoutComply`).pipe(
            tap((response) =>
            {
                this._remesa.next(response);
            }),
        );
    }

    /**
     * Update status
     */
    updateStatus(object: Consignment): Observable<any>
    {
        return this._httpClient.put<Consignment>(`${this.apiUrl}/updateStatus`, object).pipe(
            tap((response) =>
            {
                this._remesa.next(response);
            }),
        );
    }

    /**
     * Update consignment values
     */
    updateRMValues(object: Consignment): Observable<any>
    {
        return this._httpClient.put<Consignment>(`${this.apiUrl}/updateRMValues`, object).pipe(
            tap((response) =>
            {
                this._remesa.next(response);
            }),
        );
    }

    /**
     * Get all by driver id
     */
    getAllByDriver(id: number): Observable<any>
    {
        return this._httpClient.get<Consignment>(`${this.apiUrl}/readByDriver/` + id).pipe(
            tap((response) =>
            {
                this._remesa.next(response);
            }),
        );
    }

    /**
     * Get all by owner id
     */
    getAllByOwner(id: number): Observable<any>
    {
        return this._httpClient.get<Consignment>(`${this.apiUrl}/readAllByPropietario/` + id).pipe(
            tap((response) =>
            {
                this._remesa.next(response);
            }),
        );
    }

    /**
     * Get all by owner id
     */
    getAllByHolder(id: number): Observable<any>
    {
        return this._httpClient.get<Consignment>(`${this.apiUrl}/readAllByTenedor/` + id).pipe(
            tap((response) =>
            {
                this._remesa.next(response);
            }),
        );
    }

    /**
     * Get all by third id
     */
    getAllByThird(id: number): Observable<any>
    {
        return this._httpClient.get<Consignment>(`${this.apiUrl}/readAllByThird/` + id).pipe(
            tap((response) =>
            {
                this._remesa.next(response);
            }),
        );
    }

    /**
     * Get all by third id
     */
    getAllByThirdUnfactured(document: string): Observable<any>
    {
        return this._httpClient.get<Consignment>(`${this.apiUrl}/readAllByThirdUnfactured/` + document).pipe(
            tap((response) =>
            {
                this._remesa.next(response);
            }),
        );
    }


}