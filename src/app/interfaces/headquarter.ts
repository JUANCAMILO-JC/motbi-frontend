import { User } from "app/core/user/user.types";
import { City } from "./city";
import { Third } from "./third";

export interface Headquarter {
    id:            number;
    address:       string;
    officename:    string;
    contactname:   string;
    celular:       string;
    longitude:     string;
    latitude:      string;
    type:          string;
    status:        number;
    createdAt:     Date;
    updatedAt:     Date;
    third_id:      number;
    thirdId:       Third;
    user_id:       number;
    userId:        User;
    department_id: number;
    city_id:       number;
    cityId:        City;
}
