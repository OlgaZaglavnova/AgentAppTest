import { Injectable } from "@angular/core";
import { Tariff, TARIFF_NAME } from "src/app/models/tariff.model";
import { DataService } from "./data.service";

@Injectable({
    providedIn: 'root'
  })
  export class AeroflotService {

    tariffEconom: Tariff = {
        price1kmRub: 4,
        freeBagageWeightKg: 5,
        baggagePriceRub: 4000,
        maxBaggageWeightKg: 20
    };
    tariffAdvanced: Tariff = {
        price1kmRub: 8,
        freeBagageWeightKg: 20,
        baggagePriceRub: 5000,
        maxBaggageWeightKg: 50,
        discountAge: 7,
        discountPercent: 0.3
    };
    tariffLux: Tariff = {
        price1kmRub: 15,
        baggagePriceRub: 0,
        maxBaggageWeightKg: 50,
        discountAge: 16,
        discountPercent: 0.3
    };
    
    constructor(
        private dataService: DataService
    ){}

    getOffer(tariff: TARIFF_NAME): number | null {
        let currentTariff: Tariff | null;
        let sum = 0;
        switch (tariff) {
            case TARIFF_NAME.ECONOM: {
                currentTariff = this.tariffEconom;
                break;
            }
            case TARIFF_NAME.ADVANCED: {
                currentTariff = this.tariffAdvanced;
                break;
            }
            case TARIFF_NAME.LUX: {
                currentTariff = this.tariffLux;
                break;
            }
            default: { 
                currentTariff = null;
                console.log("Invalid choice"); 
                break;              
             } 
        }
        if (!currentTariff || !this.dataService.baggageWeight || this.dataService.baggageWeight > currentTariff.maxBaggageWeightKg) {
            return null;
        } else {
            if (this.dataService.distance){
                sum += this.dataService.distance * currentTariff.price1kmRub
            }
            if (this.dataService.age && currentTariff.discountAge && currentTariff.discountPercent && this.dataService.age <= currentTariff.discountAge) {
                sum = sum *(1 - currentTariff.discountPercent);
            }
            if (currentTariff.freeBagageWeightKg) {
                if (this.dataService.baggageWeight > currentTariff.freeBagageWeightKg) {
                    sum += currentTariff.baggagePriceRub;
                }
            }
            return sum;
        }

    }

  }