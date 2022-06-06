import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CompareService } from 'src/app/services/compare/compare.service';

@Component({
  selector: 'app-add-compare',
  templateUrl: './add-compare.component.html',
  styleUrls: ['./add-compare.component.css'],
})
export class AddCompareComponent implements OnInit {
  compareForm: FormGroup;
  isLoading = false;
  constructor(private readonly compareService: CompareService) {}

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.compareForm = new FormGroup({
      height: new FormControl(null, Validators.required),
      age: new FormControl(null, Validators.required),
      income: new FormControl(null, Validators.required),
    });
  }

  addBtnClick() {
    if (this.compareForm.invalid) return;
    const value = this.compareForm.value;
    console.log({ value });
    this.compareService.storeData(value);
  }
}
