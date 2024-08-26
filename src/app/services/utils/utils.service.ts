import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

    private baseReteFuente: number;
    private baseReteICA: number;
    private apiUrl: string;

    /**
     * Constructor
     */
    constructor() 
    { 
        this.baseReteFuente = 188000;
        this.baseReteICA = 188000;
        this.apiUrl = environment.apiUrl;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------





    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    findPositionInArray(array: any[], searchText: string): number | null {
      const index = array.findIndex(item => item === searchText);
      return index !== -1 ? index : null;
    }


    /**
     * Get 
     */
    getBaseRteFte(): Observable<number>
    {   
        return of(this.baseReteFuente)
    }

    /**
     * Get 
     */
    getBaseRteICA(): Observable<number>
    {   
        return of(this.baseReteICA)
    }

    /**
     * Get 
     */
    getIp()
    {   
        return this.apiUrl;
    }

    verificationDigit(nit: string) {
        var arreglo: any[], x, y, z, i, nit1, dv1;
        nit1 = nit;
        if (isNaN(nit1)) {
            return false;
        } else {
            arreglo = new Array(16);
            x = 0; y = 0; z = nit1.length;
            arreglo[1] = 3; arreglo[2] = 7; arreglo[3] = 13;
            arreglo[4] = 17; arreglo[5] = 19; arreglo[6] = 23;
            arreglo[7] = 29; arreglo[8] = 37; arreglo[9] = 41;
            arreglo[10] = 43; arreglo[11] = 47; arreglo[12] = 53;
            arreglo[13] = 59; arreglo[14] = 67; arreglo[15] = 71;
            for (i = 0; i < z; i++) {
                y = (nit1.substr(i, 1));
                x += (y * arreglo[z - i]);
            }
            y = x % 11;
            if (y > 1) {
                dv1 = 11 - y;
            } else {
                dv1 = y;
            }
            return dv1;
        }
    }

    sortList() {
        // Ordenar la lista alfabéticamente por la propiedad 'nombre'
        // const listaOrdenada = lista.sort((a, b) => {
        //     const nombreA = a.nombre.toLowerCase();
        //     const nombreB = b.nombre.toLowerCase();

        //     if (nombreA < nombreB) {
        //         return -1;
        //     }
        //     if (nombreA > nombreB) {
        //         return 1;
        //     }
        //     return 0;
        // });

    }
}
