import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Employee } from './model/employee.interface';
import { EmployeeService } from './service/employee/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit, OnDestroy {
  employees: Employee[] = [];
  employeesSubscription: Subscription;
  constructor(private readonly employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeesSubscription = this.employeeService.getEmployees().subscribe({
      next: (res: Employee[]) => {
        this.employees = res;
      },
      error: (err: HttpErrorResponse) => {
        console.log({ err });
        alert(err.message);
      },
    });
    //Deprecated
    // .subscribe((res: Employee[]) => {
    //   this.employees = res;
    // });
  }

  ngOnDestroy(): void {
    this.employeesSubscription.unsubscribe();
  }
}
