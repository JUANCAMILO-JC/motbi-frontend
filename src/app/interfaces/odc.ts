import { Car } from "./car";
import { Request } from "./request";
import { Third } from "./third";

export interface Odc {
    id:           number;
    status:       number;
    observations: string;
    createdAt:    Date;
    updatedAt:    Date;
    request_id:   number;
    requestId:    Request;
    cars_id:      number;
    carsId:       Car;
    third_id:     number;
    thirdId:      Third;
    driver_id:    number;
    driverId:     Third;
    holder_id:    number;
    holderId:     Third;
    owner_id:     number;
    ownerId:      Third;
    status_id:    number;
}
