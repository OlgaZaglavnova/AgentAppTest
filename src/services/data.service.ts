import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class DataService {
      distance: number | null = null;
      age: number | null = null;
      baggageWeight: number | null = null;

  }