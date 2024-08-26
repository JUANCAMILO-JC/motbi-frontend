import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, map, tap } from 'rxjs';
import { Car } from 'app/models/car';

@Injectable({
  providedIn: 'root'
})
export class CarsService 
{
  private _car: ReplaySubject<Car> = new ReplaySubject<Car>(1);
  private apiUrl = environment.apiUrl + "/api/cars";
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
    set advance(value: Car)
    {   
        // Store the value
        this._car.next(value);
    }

    get advance$(): Observable<Car>
    {   
        return this._car.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get by id
     */
    get(id: number): Observable<Car>
    {   
        return this._httpClient.get<Car>(`${this.apiUrl}/` + id ).pipe(
            tap((response) =>
            {   
                this._car.next(response);
            }),
        );
    }

    /**
     * Create
     *
     * @param user
     */
    create(object: Car): Observable<any>
    {
        return this._httpClient.post<Car>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._car.next(response);
            }),
        );
    }

    /**
     * Update
     *
     * @param user
     */
    update(object: Car): Observable<any>
    {
        return this._httpClient.put<Car>(`${this.apiUrl}`, object).pipe(
            tap((response) =>
            {
                this._car.next(response);
            }),
        );
    }

    /**
     * Delete 
     *
     * @param advance
     */
    delete(object: Car): Observable<any>
    {
        return this._httpClient.delete<Car>(`${this.apiUrl}/` + object.id).pipe(
            tap((response) =>
            {
                this._car.next(response);
            }),
        );
    }

    /**
     * Get all
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<Car>(`${this.apiUrl}`).pipe(
            tap((response) =>
            {
                this._car.next(response);
            }),
        );
    }

    /**
     * Get all car by User
     */
    getAllByUser(id: string): Observable<any>
    {
        return this._httpClient.get<Car>(`${this.apiUrl}` + id).pipe(
            tap((response) =>
            {
                this._car.next(response);
            }),
        );
    }

    /**
     * Unlink Driver from a Vehicle by vehicle ID
     */
    deleteDriverCar(object: any): Observable<any>
    {
        return this._httpClient.delete<Car>(`${this.apiUrl}/removeDriver/` + object.id).pipe(
            tap((response) =>
            {
                this._car.next(response);
            }),
        );
    }

    /**
     * Return a Vehicle if the plate sent exists in an active state
     */
    existplaca(object: any): Observable<any>
    {
        return this._httpClient.post<Car>(`${this.apiUrl}/placaexist`, {object}).pipe(
            tap((response) =>
            {
                this._car.next(response);
            }),
        );
    }

    /**
     * Returns a vehicle if the plate sent exists in an active or inactive state.
     */
    searchVehicle(object: any): Observable<any>
    {
        return this._httpClient.post<Car>(`${this.apiUrl}/searchVehicle`, object).pipe(
            tap((response) =>
            {
                this._car.next(response);
            }),
        );
    }

    /**
     * Returns a vehicle if the id of the trailer sent is assigned
     */
    trailerAsignado(object: any): Observable<any>
    {
        return this._httpClient.post<Car>(`${this.apiUrl}/trailerAsignado`, object).pipe(
            tap((response) =>
            {
                this._car.next(response);
            }),
        );
    }

    /**
     * Return Vehicle by driver ID
     */
    getAllByDriver(id: string): Observable<any>
    {
        return this._httpClient.get<Car>(`${this.apiUrl}/conductor/` + id).pipe(
            tap((response) =>
            {
                this._car.next(response);
            }),
        );
    }

    /**
     * Return Vehicle by owner ID
     */
    getAllByTenedor(id: string): Observable<any>
    {
        return this._httpClient.get<Car>(`${this.apiUrl}/tenedor/` + id).pipe(
            tap((response) =>
            {
                this._car.next(response);
            }),
        );
    }

    /**
     * Returns a Vehicle by cartype_id, carclass_id and owner_id
     */
    getAllCarsByType(object: any): Observable<any>
    {
        return this._httpClient.post<Car>(`${this.apiUrl}/readAllByTypeClass`, object).pipe(
            tap((response) =>
            {
                this._car.next(response);
            }),
        );
    }

    /**
     * Return a Vehicle by cartype_id, carclass_id
     */
    getAllCarsByTypeAdmin(object: any): Observable<any>
    {   
        return this._httpClient.post<Car>(`${this.apiUrl}/readAllByTypeClassAdmin`, object).pipe(
            tap((response) =>
            {
                this._car.next(response);
            }),
        );
    }

    /**
     * Return Available Vehicle ListD
     */
    getAllAvailables(): Observable<any>
    {
        return this._httpClient.get<Car>(`${this.apiUrl}/availables/all`).pipe(
            tap((response) =>
            {
                this._car.next(response);
            }),
        );
    }

    /**
     * Update car status
     */
    updateStatus(object: Car): Observable<any>
    {
        return this._httpClient.put<Car>(`${this.apiUrl}/updateStatus`, object).pipe(
            tap((response) =>
            {
                this._car.next(response);
            }),
        );
    }

    /**
     * Returns the number of Vehicles that are in different states
     */
    contarStatus(): Observable<any>
    {
        return this._httpClient.get<Car>(`${this.apiUrl}/contarStatus/1`).pipe(
            tap((response) =>
            {
                this._car.next(response);
            }),
        );
    }

}