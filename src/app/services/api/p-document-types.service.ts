import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { PDocDriver } from 'app/interfaces/p-doc-driver';
import { PDocumentType } from 'app/interfaces/p-document-type';

@Injectable({
  providedIn: 'root'
})
export class PDocumentTypesService 
{
    private _p_docType: ReplaySubject<PDocumentType> = new ReplaySubject<PDocumentType>(1);
    private apiUrl = environment.apiUrl + "/api/p_DocTypes";
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
    set advance(value: PDocumentType)
    {   
        // Store the value
        this._p_docType.next(value);
    }

    get advance$(): Observable<PDocumentType>
    {   
        return this._p_docType.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<PDocumentType>
    {   
        return this._httpClient.get<PDocumentType>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._p_docType.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: PDocumentType): Observable<any>
    {
        return this._httpClient.post<PDocumentType>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._p_docType.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: PDocumentType): Observable<any>
    {
        return this._httpClient.put<PDocumentType>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._p_docType.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: PDocumentType): Observable<any>
    {
        return this._httpClient.delete<PDocumentType>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._p_docType.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<PDocumentType>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._p_docType.next(response);
            }),
        );
    }
}
