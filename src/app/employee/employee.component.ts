import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Employee } from './model/employee.interface';
import { EmployeeService } from '../services/employee/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit, OnDestroy {
  employees: Employee[] = [];
  employeesSubscription: Subscription;
  loading = true;
  constructor(
    private readonly employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeesSubscription = this.employeeService.getEmployees().subscribe({
      next: (res: Employee[]) => {
        this.loading = false;
        this.employees = res;
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
      },
    });
    //Deprecated
    // .subscribe((res: Employee[]) => {
    //   this.employees = res;
    // });
  }

  onEditClick(id: number) {
    this.router.navigate([`/edit/${id}`]);
  }

  onDeleteClick(id: number) {
    console.log('delete calling');
    this.employeeService.deleteEmployee(id).subscribe({
      next: (response: any) => {
        this.getEmployees();
      },
    });
  }

  ngOnDestroy(): void {
    this.employeesSubscription.unsubscribe();
  }
}
