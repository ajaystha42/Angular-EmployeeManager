import { Component, OnInit } from '@angular/core';
import { Compare } from 'src/app/model/Compare';
import { CompareService } from 'src/app/services/compare/compare.service';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css'],
})
export class SingleComponent implements OnInit {
  user: Compare;
  constructor(private readonly compareService: CompareService) {}

  ngOnInit(): void {
    this.compareService.retrieveData(false);
    this.user = this.compareService.getUser();
    this.compareService.getUserListener().subscribe({
      next: (res) => {
        this.user = res;
      },
    });
  }

  onDeleteHandler() {
    this.compareService.onDeleteData();
  }
}
