using taco.stand.tenant from '../db/tenant-model';

service CatalogService @(path:'/odata/v4/CatalogService'){
    entity Tacos as projection on tenant.Taco;
}