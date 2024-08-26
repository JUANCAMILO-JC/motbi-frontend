import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { RetrieveIn } from 'app/interfaces/retrieve-in';

@Injectable({
  providedIn: 'root'
})
export class RetrieveInService {

  private _retriveIn: ReplaySubject<RetrieveIn> = new ReplaySubject<RetrieveIn>(1);
  private apiUrl = environment.apiUrl + "/api/request";

  constructor(private _httpClient: HttpClient) { }
  // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter
     *
     * @param value
     */
    set advance(value: RetrieveIn)
    {   
        // Store the value
        this._retriveIn.next(value);
    }

    get advance$(): Observable<RetrieveIn>
    {   
        return this._retriveIn.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<RetrieveIn>
    {   
        return this._httpClient.get<RetrieveIn>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._retriveIn.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: RetrieveIn): Observable<any>
    {
        return this._httpClient.post<RetrieveIn>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._retriveIn.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: RetrieveIn): Observable<any>
    {
        return this._httpClient.put<RetrieveIn>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._retriveIn.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: RetrieveIn): Observable<any>
    {
        return this._httpClient.delete<RetrieveIn>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._retriveIn.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<RetrieveIn>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._retriveIn.next(response);
            }),
        );
    }
}
