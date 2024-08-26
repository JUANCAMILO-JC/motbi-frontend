import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, catchError, tap, throwError } from 'rxjs';
import { Request } from 'app/models/request';

import { filter, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService 
{
    private _request: ReplaySubject<Request> = new ReplaySubject<Request>;
    private apiUrl = environment.apiUrl + "/api/request";


    private _unsubscribeAll: Subject<any> = new Subject<any>();

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
    set advance(value: Request)
    {   
        // Store the value
        this._request.next(value);
    }

    get advance$(): Observable<Request>
    {   
        return this._request.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<any>
    {   
        return this._httpClient.get<Request>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._request.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: Request): Observable<any>
    {
        return this._httpClient.post<Request>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._request.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: Request): Observable<any>
    {
        return this._httpClient.put<Request>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._request.next(response);
            }),
            catchError((error) => {
                console.error('Error en la solicitud:', error);
                return throwError(() => error);
            })
            
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: Request): Observable<any>
    {
        return this._httpClient.delete<Request>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._request.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<Request>(`${this.apiUrl}`);
        /* return this._httpClient.get<Request>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                console.log(response)
                this._request.next(response);
            }),
        ); */
    }

    /**
     * Get all
     */
    getAllByUser(id: number): Observable<any>
    {
        return this._httpClient.get<Request>(`${this.apiUrl}/solicitudporusuario/` + id).pipe(
            tap((response) =>
            {
                this._request.next(response);
            }),
        );
    }

    /**
     * Get last request
     */
    getAllByRange(object: any): Observable<any>
    {
        return this._httpClient.post<Request>(`${this.apiUrl}/readAllByDateRange/`, object).pipe(
            tap((response) =>
            {
                this._request.next(response);
            }),
        );
    }


    /**
     * Get last request
     */
    ultimaSolicitud(object: Request): Observable<any>
    {
        return this._httpClient.post<Request>(`${this.apiUrl}/ultimaSolicitud`, object).pipe(
            tap((response) =>
            {
                this._request.next(response);
            }),
        );
    }

    /**
     * Get month average
     */
    promedioMes(): Observable<any>
    {
        return this._httpClient.get<Request>(`${this.apiUrl}/promedioMes/a`).pipe(
            tap((response) =>
            {
                this._request.next(response);
            }),
        );
    
    
    }
    
    /**
     * Get graphic month average
     */
    promedioMesGrafica(): Observable<any>
    {
        return this._httpClient.get<Request>(`${this.apiUrl}/promedioMes/a`).pipe(
            tap((response) =>
            {
                this._request.next(response);
            }),
        );
    }

    /**
     * Get 
     */
    getPendiente(id: number): Observable<any>
    {
        return this._httpClient.get<Request>(`${this.apiUrl}/pediente/` + id).pipe(
            tap((response) =>
            {
                this._request.next(response);
            }),
        );
    }

    /**
     * Get last request
     */
    getAllByCar(object: Request): Observable<any>
    {
        return this._httpClient.post<Request>(`${this.apiUrl}/readAllByCarcharacteristics/`, object).pipe(
            tap((response) =>
            {
                this._request.next(response);
            }),
        );
    }

    /**
     * Update
     */
    updateStatus(object: Request): Observable<any>
    {
        return this._httpClient.put<Request>(`${this.apiUrl}/UpdateStatus`, object).pipe(
            tap((response) =>
            {
                this._request.next(response);
            }),
            catchError((error) => {
                return throwError(() => error);
            })
            
        );
    }

    /**
     * Get 
     */
    contarStatus(): Observable<any>
    {
        return this._httpClient.get<Request>(`${this.apiUrl}/contarStatus/1`).pipe(
            tap((response) =>
            {
                this._request.next(response);
            }),
        );
    }

    /**
     * Get documentary traceability by id service
     */
    getDocumentaryTraceability(id: number): Observable<any>
    {

        return this._httpClient.get(`${this.apiUrl}/DocumentaryTraceability/` + id).pipe(
            tap((response) =>
            {
                this._request.next(response);
            }),
        );
    
    
    }

}