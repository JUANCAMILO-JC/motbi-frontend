import { Odc } from "./odc";
import { PRequestStatus } from "./p-request-status";

export interface Remesa {
    id:                   number;
    status:               string;
    origin_weight:        string;
    origin_quantity:      string;
    origin_freight:       string;
    origin_rate:          string;
    destination_weight:   string;
    destination_quantity: string;
    destination_freight:  string;
    destination_rate:     string;
    observations:         string;
    facturado:            boolean;
    comply:               boolean;
    ica_destination:      string;
    rfuente_destination:  string;
    authorization_RNDC:   string;
    obs_novelties:        string;
    createdAt:            Date;
    updatedAt:            Date;
    chargingorder_id:     number;
    chargingorderId:      Odc;
    status_id:            number;
    stausId:              PRequestStatus;
}
