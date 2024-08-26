import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { PProductClassification } from 'app/interfaces/p-product-classification';

@Injectable({
  providedIn: 'root'
})
export class PProductClassificationService 
{
    private _p_productClassification: ReplaySubject<PProductClassification> = new ReplaySubject<PProductClassification>(1);
    private apiUrl = environment.apiUrl + "/api/p_ProductClassifications";
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
    set advance(value: PProductClassification)
    {   
        // Store the value
        this._p_productClassification.next(value);
    }

    get advance$(): Observable<PProductClassification>
    {   
        return this._p_productClassification.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<PProductClassification>
    {   
        return this._httpClient.get<PProductClassification>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._p_productClassification.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: PProductClassification): Observable<any>
    {
        return this._httpClient.post<PProductClassification>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._p_productClassification.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: PProductClassification): Observable<any>
    {
        return this._httpClient.put<PProductClassification>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._p_productClassification.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: PProductClassification): Observable<any>
    {
        return this._httpClient.delete<PProductClassification>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._p_productClassification.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<PProductClassification>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._p_productClassification.next(response);
            }),
        );
    }

    /**
     * Gets all products by nature
     */
    getAllByProductCharacter(id: number): Observable<any>
    {   
        return this._httpClient.get<PProductClassification>(`${this.apiUrl}/readAllByProductCharacters/` + id)
    }
}