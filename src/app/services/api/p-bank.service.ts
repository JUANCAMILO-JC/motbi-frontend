import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, map, tap } from 'rxjs';
import { PBank } from 'app/models/p-bank';

@Injectable({
  providedIn: 'root'
})
export class PBankService 
{
  private _p_bank: ReplaySubject<PBank> = new ReplaySubject<PBank>(1);
  private apiUrl = environment.apiUrl + "/api/p_Banks";
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
  set advance(value: PBank)
  {   
      // Store the value
      this._p_bank.next(value);
  }

  get advance$(): Observable<PBank>
  {   
      return this._p_bank.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get by id
   */
  get(id: number): Observable<PBank>
  {   
      return this._httpClient.get<PBank>(`${this.apiUrl}/` + id ).pipe(
          tap((response) =>
          {   
              this._p_bank.next(response);
          }),
      );
  }

  /**
   * Create
   *
   * @param user
   */
  create(object: PBank): Observable<any>
  {
      return this._httpClient.post<PBank>(`${this.apiUrl}`, object).pipe(
          tap((response) =>
          {
              this._p_bank.next(response);
          }),
      );
  }

  /**
   * Update
   *
   * @param user
   */
  update(object: PBank): Observable<any>
  {
      return this._httpClient.put<PBank>(`${this.apiUrl}`, object).pipe(
          tap((response) =>
          {
              this._p_bank.next(response);
          }),
      );
  }

  /**
   * Delete 
   *
   * @param advance
   */
  delete(object: PBank): Observable<any>
  {
      return this._httpClient.delete<PBank>(`${this.apiUrl}/` + object.id).pipe(
          tap((response) =>
          {
              this._p_bank.next(response);
          }),
      );
  }

  /**
   * Get all
   */
  getAll(): Observable<any>
  {
      return this._httpClient.get<PBank>(`${this.apiUrl}`).pipe(
          tap((response) =>
          {
              this._p_bank.next(response);
          }),
      );
  }
}
