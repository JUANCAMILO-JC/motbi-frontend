import { Car } from "./car";
import { Request } from "./request";

export interface ApplyODC {
    id:         number;
    createdAt:  Date;
    updatedAt:  Date;
    request_id: number;
    requestId:  Request;
    cars_id:    number;
    carsId:     Car;



}
