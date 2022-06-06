import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { Employee } from '../model/employee.interface';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  editMode = false;
  employee: Employee;
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.route.params.subscribe({
    //   next: (params: Params) => {
    //     const id = params['id'];
    //     if (id) {
    //       this.editMode = true;
    //       this.employeeService
    //         .getEmployeeById(id)
    //         .subscribe((response: Employee) => {
    //           console.log({ response });
    //           this.employee = response;
    //           this.employeeForm.setValue({
    //             name: response.name,
    //             email: response.email,
    //             jobTitle: response.jobTitle,
    //             phone: response.phone,
    //             imageUrl: response.imageUrl,
    //           });
    //         });
    //     } else {
    //       this.editMode = false;
    //     }
    //   },
    // });
    this.formInitialize();
  }

  formInitialize() {
    this.employeeForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      jobTitle: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      imageUrl: new FormControl(null, Validators.required),
    });
  }

  addBtnClick() {
    // if (this.employeeForm.invalid) return;
    // const value = this.employeeForm.value;
    // if (this.editMode) {
    //   console.log({ emplooyee: this.employee });
    //   value.id = this.employee.id;
    //   value.employeeCode = this.employee.employeeCode;
    //   this.employeeService.updateEmployee(value).subscribe({
    //     next: (response: any) => {
    //       this.employeeForm.reset();
    //       this.router.navigate(['/']);
    //     },
    //     error: (err: HttpErrorResponse) => alert(err.message),
    //   });
    // } else {
    //   this.employeeService.addEmployee(value).subscribe({
    //     next: (res: Employee) => {
    //       this.employeeForm.reset();
    //       this.router.navigate(['/']);
    //     },
    //     error: (err: HttpErrorResponse) => {
    //       alert(err.message);
    //     },
    //   });
    // }
  }
}
