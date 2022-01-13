using taco.stand.common from '../db/common-model';

service AdminService @(path:'/odata/v4/AdminService'){
	entity Currencys as projection on common.Currency;
	entity Countrys as projection on common.Country;
	entity UnitOfWeights as projection on common.UnitOfWeight;
}