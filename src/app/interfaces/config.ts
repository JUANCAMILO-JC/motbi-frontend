import { PInsurance } from "./p-insurance";

export interface Config {
    id:                      number;
    name_company:            string;
    nit:                     string;
    dv:                      string;
    phone:                   string;
    celular:                 string;
    email:                   string;
    address:                 string;
    enable_number:           string;
    number_insurance_policy: string;
    logo:                    string;
    description_driver:      string;
    description_owner:       string;
    description_generador:   string;
    title_landing:           string;
    linkappstore:            string;
    terms:                   string;
    video_driver:            string;
    video_owner:             string;
    video_generador:         string;
    video_driver_m:          string;
    video_owner_m:           string;
    video_generador_m:       string;
    status:                  string;
    expiration_date_policy:  Date;
    createdAt:               Date;
    updatedAt:               Date;
    insurance_id:            number;
    insuranceId:             PInsurance;
}
