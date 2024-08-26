import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/models/user';
import { UserRolles } from 'app/interfaces/user-rolles.type';
import { environment } from 'environments/environment';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { MD5 } from 'crypto-js';

export interface loggedUser {
    active: boolean,
    doc:string,
    name: string,
    profile: number,
    third: number
  }

@Injectable({providedIn: 'root'})
export class UserService
{
    private _user: ReplaySubject<User> = new ReplaySubject<User>;
    private apiUrl = environment.apiUrl + "/api/users";
    private _userRolles: ReplaySubject<UserRolles[]>;
    private isAdmin: boolean        = false;
    private isCoodinator: boolean   = false;
    private isCollaborator: boolean = false;
    private isAssistan: boolean     = false;
    private isCustomer: boolean     = false;
    private isDriver: boolean       = false;
    private isOwner: boolean        = false;
    private isHolder: boolean       = false;

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
        this._userRolles = new ReplaySubject<UserRolles[]>;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User)
    {   
        // Store the value
        this._user.next(value);
    }

    get user$(): Observable<User>
    {   
        return this._user.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current logged in user data
     */
    get(): Observable<User>
    {   
        let profile = this._user.subscribe( u => u.profileId)
        return this._httpClient.get<User>(`${this.apiUrl}/profile/` + profile ).pipe(
            tap((user) =>
            {   
                user.status = 'online'
                user.avatar = ('assets/images/avatars/orange-truck-avatar.PNG');
                this._user.next(user);
            }),
        );
    }

    /**
     * Get the current logged in user data
     */

    /**
     * Get user By Id
     */
    getUser(id: number): Observable<User>
    {   
        return this._httpClient.get<User>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._user.next(response);
            }),
        );
    }

    /**
     * Create the user
     *
     * @param user
     */
    create(user: User): Observable<any>
    {
        user.password = MD5(user.password).toString();
        return this._httpClient.post<User>(`${this.apiUrl}`, user).pipe(
            tap((response) =>
            {
                this._user.next(response);
            }),
        );
    }

    /**
     * Update the user
     *
     * @param user
     */
    update(user: User): Observable<any>
    {
        return this._httpClient.patch<User>(`${this.apiUrl}`, user).pipe(
            tap((response) =>
            {
                this._user.next(response);
            }),
        );
    }

    /**
     * Save pre register user
     *
     * @param user
     */
    preregister(user: User): Observable<any>
    {
        return this._httpClient.patch<User>(`${this.apiUrl}/preregister`, user).pipe(
            tap((response) =>
            {
                this._user.next(response);
            }),
        );
    }

    /**
     * Verify if mail user exist
     *
     * @param user
     */
    emailexist(user: User): Observable<any>
    {
        return this._httpClient.post<User>(`${this.apiUrl}/userexist`, user).pipe(
            tap((response) =>
            {
                this._user.next(response);
            }),
        );
    }

    /**
     * Verify if document user user exist
     *
     * @param user
     */
    docexist(user: User): Observable<any>
    {
        return this._httpClient.post<User>(`${this.apiUrl}/docexist`, user).pipe(
            tap((response) =>
            {
                this._user.next(response);
            }),
        );
    }

    /**
     * Verify if document user user exist
     */
    userprofile(id: number): Observable<any>
    {
        return this._httpClient.get<User>(`${this.apiUrl}/userprofile/`+ id).pipe(
            tap((response) =>
            {
                this._user.next(response);
            }),
        );
    }

    /**
     * Verify if document user user exist
     *
     * @param user
     */
    validateCode(user: User): Observable<any>
    {
        return this._httpClient.post<User>(`${this.apiUrl}/verifyCodeWeb`, user).pipe(
            tap((response) =>
            {
                this._user.next(response);
            }),
        );
    }

    /**
     * Verify if document user user exist
     *
     * @param user
     */
    activateUser(user: User): Observable<any>
    {
        return this._httpClient.post<User>(`${this.apiUrl}/ActivarUsuario`, user).pipe(
            tap((response) =>
            {
                this._user.next(response);
            }),
        );
    }

    /**
     * Updtate user pass
     *
     * @param user
     */
    updatepass(user: User): Observable<any>
    {
        return this._httpClient.post<User>(`${this.apiUrl}/updatepass`, user).pipe(
            tap((response) =>
            {
                this._user.next(response);
            }),
        );
    }

    /**
     * Send mail user pass
     *
     * @param user
     */
    sendmailpass(user: User): Observable<any>
    {
        return this._httpClient.post<User>(`${this.apiUrl}/sendpassword`, user).pipe(
            tap((response) =>
            {
                this._user.next(response);
            }),
        );
    }

    sendmailpassCreate(user: User): Observable<any>
    {
        user.password = MD5(user.password).toString();
        return this._httpClient.post<User>(`${this.apiUrl}/sendMail`, user).pipe(
            tap((response) =>
            {
                this._user.next(response);
            }),
        );
    }

    

    /**
     * Block user
     *
     * @param user
     */
    blockUser(user: User): Observable<any>
    {
        return this._httpClient.post<User>(`${this.apiUrl}/bloquear`, user).pipe(
            tap((response) =>
            {
                this._user.next(response);
            }),
        );
    }

    /**
     * Delete user
     *
     * @param user
     */
    deleteUser(user: User): Observable<any>
    {
        return this._httpClient.delete<User>(`${this.apiUrl}/` + user.id).pipe(
            tap((response) =>
            {
                this._user.next(response);
            }),
        );
    }

    /**
     * Chage user Password
     *
     * @param user
     */
    updatePassword(user: User): Observable<any>
    {
        return this._httpClient.put<User>(`${this.apiUrl}/changepassword`, user).pipe(
            tap((response) =>
            {
                this._user.next(response);
            }),
        );
    }

    /**
     * Get users by profile
     *
     */
    getUsers(): Observable<any>
    {
        return this._httpClient.get<User>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._user.next(response);
            }),
        );
    }

    /**
     * Get users by document
     *
     */
    getUsersByDoc(document: string): Observable<any>
    {
        return this._httpClient.get<User>(`${this.apiUrl}/userdoc/` + document).pipe(
            tap((response) =>
            {
                this._user.next(response);
            }),
        );
    }

    /**
     * Get users by third
     *
     */
    getUsersByThird(id_third: number): Observable<any>
    {
        return this._httpClient.get<User>(`${this.apiUrl}/readAllByThird/` + id_third).pipe(
            tap((response) =>
            {
                this._user.next(response);
            }),
        );
    }

    /**
     * 
     * Save user roles in Sistem
     */
    userRolles(profile: number): Observable<any>
    {
        return this._httpClient.get(`${this.apiUrl}/profile/`+ profile).pipe(
            tap((response: any) =>
            {
                this._userRolles.next(response);
            }),
        );
    }

    /**
     * Save user roles in System
     */
    userSystem(profile: number): Observable<any>
    {
        return this._httpClient.get(`${this.apiUrl}/profile/`+ profile).pipe(
            tap((response: any) =>
            {
                this._userRolles.next(response);
            }),
        );
    }

    /**
     * Chage user Password
     *
     * @param user
     */
    cloneUser(u: User): User
    {
        let user: User
        for (let prop in u) {
            user[prop] = u[prop];
        }
        return user
    }

    /**
     * Get roles from Local Storage
     *
     */
    getRolesUserSystem(): User {
        return JSON.parse(localStorage.getItem("userRoles"));
    }

    /**
     * Get profile from Local Storage
     *
     */
    getUserSysten() {
        return JSON.parse(localStorage.getItem("loggedUser"));
    }

    /**
     * Get profile from Local Storage
     *
     */
    updateMailPhone(user: User): Observable<any> 
    {
        return this._httpClient.put<User>(`${this.apiUrl}/updateMailPhone`, user).pipe(
            tap((response) =>
            {
                this._user.next(response);
            }),
        );
    }

    /**
     * Get profile from Local Storage
     *
     */
    isInRoles(id_rol: number): Boolean {

        let roles = this.getRolesUserSystem();
        
        for (var i in roles) {

          if (roles.hasOwnProperty(i)) 
          {
            var element = roles[i];

            if (id_rol === element.idRol) 
            {
              return true;
            }
          }
        }
        return false;
      }
    
      getTypeProfile() {
        const userLogged = JSON.parse(localStorage.getItem("loggedUser"))
        let profile: string = ""

        switch (userLogged.profile) {
            case 1:

                profile = "Admin"
                
                break;
            case 2:

                profile = "User"
                
                break;
            case 3:
                profile = "Collaborator"
                
                break;
        
            default:
                break;
        }
        return profile 
      }

}
