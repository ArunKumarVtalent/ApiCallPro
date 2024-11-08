import { Component, OnInit } from '@angular/core';
import { IEmployee } from '../models/IEmployee';
import { IDepartment } from '../models/IDepartment';
import { DepartmentService } from '../myservices/department.service';
import { EmployeeService } from '../myservices/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent implements OnInit {
  sessionEmpId = window.sessionStorage.getItem("empId");
  Emp:IEmployee;
  DeptList?:IDepartment[];
  constructor(
    private deptService:DepartmentService,
    private empService:EmployeeService, 
    private route:Router){
      this.Emp = {empId:0, ename:"", password:"", gender:"", phone:"", email:"", salary:0,address:"", deptNo:0};
    }

  ngOnInit(): void {
    //alert(window.sessionStorage.getItem("empId"));
    this.deptService.getAllDepartments().subscribe(data => this.DeptList = data, error=>alert(error));
    this.empService.getEmployeeByEmpId(parseInt(this.sessionEmpId!)).subscribe(data=> this.Emp = data);
  }

  btn_Delete(){
    debugger;
    // Write logic to insert the data :
    this.Emp.empId = parseInt(this.Emp.empId.toString());   
    this.empService.deleteEmployee(this.Emp.empId).subscribe(data=>{
      alert(data + " : record delete...!");
      this.route.navigate(["home"]).then(()=>{
        window.location.reload();
      });
    }, error => console.log(error));   
  }

  btn_Cancel(){
    this.route.navigate(["home"]).then(()=>{
      window.location.reload();
    });
  }
}
