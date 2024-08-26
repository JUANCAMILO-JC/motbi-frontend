import { PCarType } from "./p-car-type";
import { Trailer } from "./trailer";

export interface PCarConfig {
    id:            number;
    code:          string;
    name_cabezote: string;
    name_remolque: string;
    name_short:    string;
    capacidad:     number;
    galon_min:     number;
    galon_max:     number;
    status:        string;
    createdAt:     Date;
    updatedAt:     Date;
    p_CarTypes_id: number;
    p_CarType:     PCarType;
    p_Trailers_id: number;
    p_Trailer: Trailer;
}
