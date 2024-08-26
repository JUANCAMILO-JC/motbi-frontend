import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, from, tap, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Headquarter } from 'app/models/headquarter';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class HeadquartersService 
{
    private _headQuarter: ReplaySubject<Headquarter> = new ReplaySubject<Headquarter>(1);
    private apiUrl = environment.apiUrl + "/api/offices";
    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private sanitizer: DomSanitizer,
        ) 
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
    set advance(value: Headquarter)
    {   
        // Store the value
        this._headQuarter.next(value);
    }

    get advance$(): Observable<Headquarter>
    {   
        return this._headQuarter.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<Headquarter>
    {   
        return this._httpClient.get<Headquarter>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._headQuarter.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: Headquarter): Observable<any>
    {
        return this._httpClient.post<Headquarter>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._headQuarter.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: Headquarter): Observable<any>
    {
        return this._httpClient.put<Headquarter>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._headQuarter.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: Headquarter): Observable<any>
    {
        return this._httpClient.delete<Headquarter>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._headQuarter.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<Headquarter>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._headQuarter.next(response);
            }),
        );
    }

    /**
     * Get all by Third
     */
    getAllByThird(id: number): Observable<any>
    {
        return this._httpClient.get<Headquarter>(`${this.apiUrl}` + /getSedesByThird/ + id).pipe(
            tap((response) =>
            {
                this._headQuarter.next(response);
            }),
        );
    }

    /**
     * Get all User
     */
    getSedesByUser(id: number): Observable<any>
    {
        return this._httpClient.post<Headquarter>(`${this.apiUrl}` + /getSedesByThird/, id).pipe(
            tap((response) =>
            {
                this._headQuarter.next(response);
            }),
        );
    }

    /**
     * Get Cordenates
     */
    getCoordinates(address: string) {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDocvqTFaKY3IAGTS6f_nRmII5jMT1WBVY`;

        return fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('La solicitud no fue exitosa');
          }
          return response.json();
        })
        .then(data => {
          // Maneja la respuesta aquí
          return data;
        })
        .catch(error => {
          // Maneja los errores aquí
          console.error('Ocurrió un error:', error);
        });
    
    }
}

