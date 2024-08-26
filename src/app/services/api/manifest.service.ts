import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, map, tap } from 'rxjs';
import { Manifest } from 'app/models/manifest';

@Injectable({
  providedIn: 'root'
})
export class ManifestService 
{
    private _manifest: ReplaySubject<Manifest> = new ReplaySubject<Manifest>(1);
    private apiUrl = environment.apiUrl + "/api/manifiesto";
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
    set advance(value: Manifest)
    {   
        // Store the value
        this._manifest.next(value);
    }

    get advance$(): Observable<Manifest>
    {   
        return this._manifest.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<Manifest>
    {   
        return this._httpClient.get<Manifest>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._manifest.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: Manifest): Observable<any>
    {
        return this._httpClient.post<Manifest>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._manifest.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: Manifest): Observable<any>
    {
        return this._httpClient.put<Manifest>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._manifest.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: Manifest): Observable<any>
    {
        return this._httpClient.delete<Manifest>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._manifest.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<Manifest>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._manifest.next(response);
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
        return this._httpClient.get<Manifest>(`${this.apiUrl}/solicitudporusuario/` + id ).pipe(
            tap((response) =>
            {
                this._manifest.next(response);
            }),
        );
    }

    /**
     * Get one manidest by consignment
     */
    getManifestByRemesa(id: number): Observable<any>
    {
        return this._httpClient.get<Manifest>(`${this.apiUrl}/Remesa/` + id ).pipe(
            tap((response) =>
            {
                this._manifest.next(response);
            }),
        );
    }

    /**
     * Get manifest by Holder
     */
    getManifiestByHolder(id: number): Observable<any>
    {
        return this._httpClient.get<Manifest>(`${this.apiUrl}/getByTenedor/` + id ).pipe(
            tap((response) =>
            {
                this._manifest.next(response);
            }),
        );
    }

    /**
     * Get 
     */
    getOdpByManifest(ids: any): Observable<any>
    {
        return this._httpClient.post<Manifest>(`${this.apiUrl}/readODP/`, ids ).pipe(
            tap((response) =>
            {
                this._manifest.next(response);
            }),
        );
    }

    sendToRNDC(object: any): Observable<any>
    {
        return this._httpClient.post<Manifest>(`${this.apiUrl}/sendToRNDC`, object ).pipe(
            tap((response) =>
            {
                this._manifest.next(response);
            }),
        );
    }


}