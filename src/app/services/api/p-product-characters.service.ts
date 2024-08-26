import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { PProductChatacter } from 'app/interfaces/p-product-chatacter';

@Injectable({
  providedIn: 'root'
})
export class PProductCharactersService 
{
    private _p_productCharacter: ReplaySubject<PProductChatacter> = new ReplaySubject<PProductChatacter>(1);
    private apiUrl = environment.apiUrl + "/api/p_ProductCharacters";
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
    set advance(value: PProductChatacter)
    {   
        // Store the value
        this._p_productCharacter.next(value);
    }

    get advance$(): Observable<PProductChatacter>
    {   
        return this._p_productCharacter.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<PProductChatacter>
    {   
        return this._httpClient.get<PProductChatacter>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._p_productCharacter.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: PProductChatacter): Observable<any>
    {
        return this._httpClient.post<PProductChatacter>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._p_productCharacter.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: PProductChatacter): Observable<any>
    {
        return this._httpClient.put<PProductChatacter>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._p_productCharacter.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: PProductChatacter): Observable<any>
    {
        return this._httpClient.delete<PProductChatacter>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._p_productCharacter.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<PProductChatacter>(`${this.apiUrl}`)
    }
}