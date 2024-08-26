import { Manifest } from "./manifest";
import { PRequestStatus } from "./p-request-status";


export interface Advance {
    id:              number;
    status:          number;
    advance_payment: string;
    observations:    string;
    createdAt:       Date;
    updatedAt:       Date;
    manifest_id:     number;
    manifestId:      Manifest;
    status_id:       number;
    statusId:        PRequestStatus;
}
