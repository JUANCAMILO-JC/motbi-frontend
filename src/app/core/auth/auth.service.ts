import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { asyncScheduler, catchError, map, Observable, of, scheduled, switchMap, tap, throwError } from 'rxjs';

import { environment } from 'environments/environment'; 
import { MD5 } from 'crypto-js';

@Injectable({providedIn: 'root'})
export class AuthService
{
    private apiUrl = environment.apiUrl + "/api/auth";
    private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string)
    {
        localStorage.setItem('accessToken', token);
    }

    set userRoles(arr: any[] )
    {
        localStorage.setItem('userRoles',  JSON.stringify(arr));
    }

    set loggedUser(data: any )
    {
        localStorage.setItem('loggedUser',  JSON.stringify(data));
    }

    get accessToken(): string
    {
        return localStorage.getItem('accessToken') ?? '';
    }

    get userRoles(): any
    {
        return localStorage.getItem('userRoles') ?? '';
    }


    get loggedUser(): string
    {
        return localStorage.getItem('loggedUser') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any>
    {
        return this._httpClient.post(`${this.apiUrl}/login`, email);
        //return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any>
    {
        return this._httpClient.post(`${this.apiUrl}/login`, password);
        //return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    //signIn(credentials: { email: string; password: string }): Observable<any> -JC
    signIn(credentials: { email: string; password: string }): Observable<any>
    {
        console.log(credentials)
        //return
        // Throw error, if the user is already logged in
        if ( this._authenticated )
        {
            return throwError( ()=>('El usuario ya esta logueado.'));
        }
        // Ecripted user password using MD5
        //credentials.password = MD5(credentials.password).toString();
        // Request to API loguin user
        console.log("antessss")
        //return
        return this._httpClient.post(`${this.apiUrl}/login`, credentials).pipe(
            tap((response: any) =>
            {   
                console.log("response:::::::::",response)
                return
                if (response.success == true) {
                    this._authenticated = true;
                    // Set the authenticated flag to true

                    // Store the access token in the local storage
                    this.accessToken = response.token;
                    // Store the profile id in the local storage
                    this.loggedUser = {
                        //profile: response.object.profile_id,
                        active:  response.object.active,

                        name:    response.object.thirdId?.business_name,
                        doc:     response.object.docid,
                        id:      response.object.id
                    }
                    
                    
                    // Store the user on the user service
                    this._userService.user = response.object;

                    
                    this._userService.userRolles(response.object.profile_id)
                    .subscribe({
                        next: (res) => {
                            this.userRoles = res.object;
                        },
                        error: (err) => {
                        }
                    });
                    
                    // Return a new observable with the response
                    return scheduled([response], asyncScheduler);
                } else {
                    return scheduled([response], asyncScheduler);
                    //return throwError( ()=>(response));
                }

            }),
        );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any>
    {   
        // Sign in using the token
        return this._httpClient.post(`${this.apiUrl}/loginwhitToken`, {
        //return this._httpClient.post('api/auth/sign-in-with-token', {
            accessToken: this.accessToken,
        }).pipe(
            catchError(() =>

                // Return false
                of(false),
            ),
            switchMap((response: any) =>
            {
                // Replace the access token with the new one if it's available on
                // the response object.
                //
                // This is an added optional step for better security. Once you sign
                // in using the token, you should generate a new one on the server
                // side and attach it to the response object. Then the following
                // piece of code can replace the token with the refreshed one.
                if (response.success == true )
                {
                    this.accessToken = response.token;
                }

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.object;

                // Return true
                return of(true);
            }),
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any>
    {
        // Throw error, if the user is already logged in
        if ( this._authenticated )
            {
                return throwError( ()=>('El usuario ya esta logueado.'));
            }

            // Request to API loguin user
            return this._httpClient.post(`${this.apiUrl}/register`, user).pipe(
                tap((response: any) =>
                {   
                    console.log(response)
                    if (response.success == true) {
                        this._authenticated = true;
                        // Set the authenticated flag to true
    
                        // Store the access token in the local storage
                        this.accessToken = response.object.token;
                        // Store the profile id in the local storage
                        this.loggedUser = {
                            //profile: response.object.profile_id,
                            id:      response.object.id,
                            name:    response.object.username,
                            active:  response.object.isActive,
                            rolls:   response.object.rolls
    
                        }
                        
                        
                        // Store the user on the user service
                        response.object.avatar = ""
                        response.object.status = 'online'
                        this._userService.user = response.object;
                        
                        // Return a new observable with the response
                        return scheduled([response], asyncScheduler);
                    } else {
                        return scheduled([response], asyncScheduler);
                        //return throwError( ()=>(response));
                    }
    
                }),
            );
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any>
    {
        return this._httpClient.post(`${this.apiUrl}/login`, credentials);
        //return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        // Check if the user is logged in
        if ( this._authenticated )
        {   
            return of(true);
        }

        // Check the access token availability
        if ( !this.accessToken )
        {
            return of(false);
        }

        // Check the access token expire date
        if ( AuthUtils.isTokenExpired(this.accessToken) )
        {
            return of(false);
        }
        // If the access token exists, and it didn't expire, sign in using it -JC
        return this.signInUsingToken();
        //return scheduled([true], asyncScheduler);
    }
}
