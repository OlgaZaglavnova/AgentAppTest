import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TARIFF_NAME } from 'src/app/models/tariff.model';
import { AeroflotService } from 'src/services/aeroflot.service';
import { DataService } from 'src/services/data.service';
import { RZhDService } from 'src/services/rzhd.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  dataForm: FormGroup;

  tariffName = TARIFF_NAME;
  clicked = false;

  constructor(
    public dataService: DataService,
    public aeroflotService: AeroflotService,
    public rzhdService: RZhDService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.dataForm = this.fb.group({
      distance: [null, [Validators.required, Validators.min(0)]],
      age: [null, [Validators.required, Validators.min(0)]],
      baggageWeight: [null, [Validators.required, Validators.min(0)]]
    })
  }

  onSubmit(): void {
    this.dataService.distance = this.dataForm.get('distance')?.value;
    this.dataService.age = this.dataForm.get('age')?.value;
    this.dataService.baggageWeight = this.dataForm.get('baggageWeight')?.value;
    this.clicked = true;
  }

}
