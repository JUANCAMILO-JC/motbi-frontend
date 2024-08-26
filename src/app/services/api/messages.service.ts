import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { Message } from 'app/interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class MessagesService 
{
  private _message: ReplaySubject<Message> = new ReplaySubject<Message>(1);
  private apiUrl = environment.apiUrl + "/api/messages";
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
    set advance(value: Message)
    {   
        // Store the value
        this._message.next(value);
    }

    get advance$(): Observable<Message>
    {   
        return this._message.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<Message>
    {   
        return this._httpClient.get<Message>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._message.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: Message): Observable<any>
    {
        return this._httpClient.post<Message>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._message.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: Message): Observable<any>
    {
        return this._httpClient.put<Message>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._message.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: Message): Observable<any>
    {
        return this._httpClient.delete<Message>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._message.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<Message>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._message.next(response);
            }),
        );
    }
}