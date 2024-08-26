import { PCarMark } from "./p-car-mark";

export interface PCarLine {
    id:          number;
    name:        number;
    value:       string;
    active:      number;
    status:      string;
    createdAt:   Date;
    updatedAt:   Date;
    p_crmark_id: number;
    p_CarMark: PCarMark
}
