import { Component, OnInit } from '@angular/core';
import { Compare } from '../model/Compare';
import { CompareService } from '../services/compare/compare.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css'],
})
export class CompareComponent implements OnInit {
  employees: Compare[] = [];
  constructor(private readonly compareService: CompareService) {}

  ngOnInit(): void {
    this.compareService.retrieveData(true);
    this.compareService.getUserListener().subscribe({
      next: (res) => {
        if (res.length > 0) {
          this.employees = res;
        }
      },
    });
  }
}
