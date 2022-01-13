namespace taco.stand.common;

using {cuid} from '@sap/cds/common';
using { managed } from '@sap/cds/common';

entity Country {
	key Symbol	: String(60);
	IATA		: String(2);
	ISO2		: String(2);
	ISO3		: String(3);
	ISO3Number	: Integer;
	Name		: String(60);
}

entity UnitOfWeight {
	key Symbol	: String(60);
	Name		: String(255);
}

entity Currency {
	key Symbol	: String(10);
	ISO3		: String(3);
	ISO3Number	: Integer;
	Name		: String(60);
}