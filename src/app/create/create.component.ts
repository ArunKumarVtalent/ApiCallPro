import { Component, OnInit } from '@angular/core';
import { IDepartment } from '../models/IDepartment';
import { DepartmentService } from '../myservices/department.service';
import { IEmployee } from '../models/IEmployee';
import { Router } from '@angular/router';
import { EmployeeService } from '../myservices/employee.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {
  Emp:IEmployee;
  DeptList?:IDepartment[];
  constructor(
    private deptService:DepartmentService,
    private empService:EmployeeService, 
    private route:Router){
      this.Emp = {empId:0, ename:"", password:"", gender:"", phone:"", email:"", salary:0,address:"", deptNo:0};
    }

  ngOnInit(): void {
    this.deptService.getAllDepartments().subscribe(data => this.DeptList = data, error=>alert(error));
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

  btn_Create():void{
    debugger;
    // Write logic to insert the data :
    if(this.validation()){
      this.Emp.salary = parseInt(this.Emp.salary.toString());
      this.Emp.deptNo = parseInt(this.Emp.deptNo.toString());
      this.empService.insertEmployee(this.Emp).subscribe(data=>{
        alert(data + " : record inserted...!");
        this.route.navigate(["home"]).then(()=>{
          window.location.reload();
        });
      }, error => console.log(error)); 
    }       
  }

  btn_Cancel():void{
    this.route.navigate(["home"]).then(()=>{
      window.location.reload();
    });
  }

}
