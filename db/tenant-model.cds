namespace taco.stand.tenant;

using {cuid} from '@sap/cds/common';
using {managed} from '@sap/cds/common';
using {taco.stand.common} from './common-model';

entity Taco : cuid, managed {
    Type            : String(10);
    Name            : String(60);
    OriginCountry   : String(10);
    UnitValue       : Decimal(15, 3);
    UnitValueUnit   : String(3);
    NetWeight       : Decimal(15, 3);
    WeightUnit      : String(3);
}



