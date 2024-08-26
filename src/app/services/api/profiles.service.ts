import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { Profile } from 'app/interfaces/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService 
{
    private _profile: ReplaySubject<Profile> = new ReplaySubject<Profile>(1);
    private apiUrl = environment.apiUrl + "/api/users/profile";
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
    set advance(value: Profile)
    {   
        // Store the value
        this._profile.next(value);
    }

    get advance$(): Observable<Profile>
    {   
        return this._profile.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<Profile>
    {   
        return this._httpClient.get<Profile>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._profile.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: Profile): Observable<any>
    {
        return this._httpClient.post<Profile>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._profile.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: Profile): Observable<any>
    {
        return this._httpClient.put<Profile>(`${this.apiUrl}`, {object}).pipe(
            tap((response) =>
            {
                this._profile.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: Profile): Observable<any>
    {
        return this._httpClient.delete<Profile>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._profile.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<Profile>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._profile.next(response);
            }),
        );
    }
}