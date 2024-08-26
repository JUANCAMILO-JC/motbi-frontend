import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, catchError, tap, throwError } from 'rxjs';
import { filter, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService 
{
    private _report: ReplaySubject<any> = new ReplaySubject<1>;
    private apiUrl = environment.apiUrl + "/api/reports";


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
    set advance(value: any)
    {   
        // Store the value
        this._report.next(value);
    }

    get advance$(): Observable<any>
    {   
        return this._report.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<any>
    {   
        return this._httpClient.get<any>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._report.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: any): Observable<any>
    {
        return this._httpClient.post<any>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._report.next(response);
            }),
        );
    }
    


    /**
     * Create
     *
     * @param object
     * @param template
     */
    seePdfReport(template: string, object: any): Observable<any>
    {
        return this._httpClient.post<any>(`${this.apiUrl}/` + template + '/see', object).pipe(
            tap((response) =>
            {
                this._report.next(response);
            }),
        );
    }


    sendInvoiceToCustomer(template: string, object: any): Observable<any>
    {
        return this._httpClient.post<any>(`${this.apiUrl}/` + template + '/send', object).pipe(
            tap((response) =>
            {
                this._report.next(response);
            }),
        );
    }

    generateSeePdfCashReceipt(template: string, object: any): Observable<any>
    {
        return this._httpClient.post<any>(`${this.apiUrl}/` + template + '/generateSeePdfCashReceipt', object).pipe(
            tap((response) =>
            {
                this._report.next(response);
            }),
        );
    }

    generateSeePdfIvoice(template: string, object: any): Observable<any>
    {
        return this._httpClient.post<any>(`${this.apiUrl}/` + template + '/generateSeePdfIvoice', object).pipe(
            tap((response) =>
            {
                this._report.next(response);
            }),
        );
    }


}