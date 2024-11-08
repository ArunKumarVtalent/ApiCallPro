import { Component, OnInit } from '@angular/core';
import { IEmployee } from '../models/IEmployee';
import { IDepartment } from '../models/IDepartment';
import { DepartmentService } from '../myservices/department.service';
import { EmployeeService } from '../myservices/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
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

  validation():boolean{
    // Check Ename
    if(this.Emp.ename == ""){
      alert("Pleaes enter name...!");
      return false;
    }

    // Check Password
    if(this.Emp.password == ""){
      alert("Pleaes enter password...!");
      return false;
    }

    // Check Gender
    if(this.Emp.gender == ""){
      alert("Pleaes select gender...!");
      return false;
    }

    // Check Phone
    if(this.Emp.phone == ""){
      alert("Pleaes enter phone...!");
      return false;
    }

    // Check Email
    if(this.Emp.email == ""){
      alert("Pleaes enter email...!");
      return false;
    }

    // Check Salary
    if(this.Emp.salary == 0){
      alert("Pleaes enter salary...!");
      return false;
    }else if(this.Emp.salary % 10 != 0){
      alert("Pleaes enter salary divisible by 10...!");
      return false;
    }

    // Check Address
    if(this.Emp.address == ""){
      alert("Pleaes enter address...!");
      return false;
    }

    // Check DeptNo
    if(this.Emp.deptNo == 0){
      alert("Pleaes select department...!");
      return false;
    }

    return true;
  }

  btn_Update(){
    debugger;
    // Write logic to insert the data :
    if(this.validation()){
      this.Emp.empId = parseInt(this.Emp.empId.toString());
      this.Emp.salary = parseInt(this.Emp.salary.toString());
      this.Emp.deptNo = parseInt(this.Emp.deptNo.toString());
      this.empService.updateEmployee(this.Emp).subscribe(data=>{
        alert(data + " : record updated...!");
        this.route.navigate(["home"]).then(()=>{
          window.location.reload();
        });
      }, error => console.log(error));  
    }     
  }

  btn_Cancel(){
    this.route.navigate(["home"]).then(()=>{
      window.location.reload();
    });
  }

}
