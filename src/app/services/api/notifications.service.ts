import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { Notification } from 'app/interfaces/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService 
{
  private _notification: ReplaySubject<Notification> = new ReplaySubject<Notification>(1);
  private apiUrl = environment.apiUrl + "/api/notifications";
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
    set advance(value: Notification)
    {   
        // Store the value
        this._notification.next(value);
    }

    get advance$(): Observable<Notification>
    {   
        return this._notification.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<Notification>
    {   
        return this._httpClient.get<Notification>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._notification.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: Notification): Observable<any>
    {
        return this._httpClient.post<Notification>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._notification.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: Notification): Observable<any>
    {
        return this._httpClient.put<Notification>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._notification.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: Notification): Observable<any>
    {
        return this._httpClient.delete<Notification>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._notification.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<Notification>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._notification.next(response);
            }),
        );
    }
}