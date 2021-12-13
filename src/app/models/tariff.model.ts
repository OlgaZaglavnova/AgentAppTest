export interface Tariff {
    price1kmRub: number,
    freeBagageWeightKg?: number,
    baggagePriceRub: number,
    maxBaggageWeightKg: number,
    discountAge?: number,
    discountPercent?: number
}

export enum TARIFF_NAME {
    ECONOM = 'ECONOM',
    ADVANCED='ADVANCED',
    LUX='LUX'
}