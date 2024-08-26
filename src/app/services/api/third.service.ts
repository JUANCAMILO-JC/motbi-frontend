import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { Third } from 'app/interfaces/third';
import { Third as _Third} from 'app/models/third';

@Injectable({
  providedIn: 'root'
})
export class ThirdService 
{
    private _third: ReplaySubject<_Third> = new ReplaySubject<_Third>(1);
    private apiUrl = environment.apiUrl + "/api/third";
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
    set advance(value: _Third)
    {   
        // Store the value
        this._third.next(value);
    }

    get advance$(): Observable<_Third>
    {   
        return this._third.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<_Third>
    {   
        return this._httpClient.get<_Third>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._third.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: _Third): Observable<any>
    {
        return this._httpClient.post<_Third>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._third.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: _Third): Observable<any>
    {
        return this._httpClient.put<_Third>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._third.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: _Third): Observable<any>
    {
        return this._httpClient.delete<_Third>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._third.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<_Third>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._third.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAllCustomers(): Observable<any>
    {
        return this._httpClient.get<_Third>(`${this.apiUrl}`+ '/readCustomers').pipe(
            tap((response) =>
            {
                this._third.next(response);
            }),
        );
    }

    /**
     * Validete if user exist by document number
     */
    docexist(user: _Third ): Observable<any>
    {
        return this._httpClient.post<Third>(`${this.apiUrl}` + '/docexist', user)
    }


    /**
     * Validete if user exist by document number
     */
    emailexist(user: _Third ): Observable<any>
    {
        return this._httpClient.post<Third>(`${this.apiUrl}` + '/emailexist', user)
    }

    /**
     * Validete if user exist by document number
     */
    sendmailpass(user: _Third ): Observable<any>
    {
        return this._httpClient.post<Third>(`${this.apiUrl}` + '/sendpassword', user)
    }


    /**
     * Validete if user exist by document number
     */
    bloquearusuario(user: _Third ): Observable<any>
    {
        return this._httpClient.post<Third>(`${this.apiUrl}` + '/bloquser', user)
    }


    /**
     * Get third by document
     */
    getThirdsByDoc(document: string): Observable<any>
    {
        return this._httpClient.get<_Third>(`${this.apiUrl}/thirddoc/` + document).pipe(
            tap((response) =>
            {
                this._third.next(response);
            }),
        );
    }

    /**
     * Get third by holder or Owner document
     */
    readHolder(document: string): Observable<any>
    {
        return this._httpClient.get<_Third>(`${this.apiUrl}/readTenedor/` + document).pipe(
            tap((response) =>
            {
                this._third.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    updateThirdProgress(object: _Third): Observable<any>
    {
        return this._httpClient.put<_Third>(`${this.apiUrl}/updateProgress`, object).pipe(
            tap((response) =>
            {
                this._third.next(response);
            }),
        );
    }
}