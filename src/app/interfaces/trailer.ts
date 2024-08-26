import { PCarColor } from "./p-car-color";
import { PCarType } from "./p-car-type";
import { PTrailer } from "./p-trailer";
import { PTrailerMark } from "./p-trailer-mark";
import { Third } from "./third";

export interface Trailer {
    id:                  number;
    placa:               string;
    trailermodel:        number;
    trailervacio:        number;
    trailerimage:        string;
    property_card_front: string;
    property_card_back:  string;
    observations:        null;
    status:              string;
    createdAt:           Date;
    updatedAt:           Date;
    owner_id:            number;
    ownerId:             Third;
    trailermarck_id:     number;
    trailermarckId:      PTrailerMark;
    trailercolor_id:     number;
    trailercolorId:      PCarColor;
    trailerconfig_id:    number;
    trailerconfigId:     PTrailer;
    trailertype_id:      number;
    trailertypeId:       PCarType;

}
