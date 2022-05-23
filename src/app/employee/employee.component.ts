import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './model/employee.interface';
import { EmployeeService } from './service/employee/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees: Employee[] = []
  constructor(private readonly employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(){
     this.employeeService.getEmployees().subscribe((res: Employee[]) => {
       this.employees = res;
     });
  }

}
