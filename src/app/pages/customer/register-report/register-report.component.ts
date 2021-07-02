import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Report} from "../../../model/business/report";
import {ReportService} from "../../../service/business/report/report.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {TokenStorageService} from "../../../service/token-storage.service";

@Component({
  selector: 'app-register-report',
  templateUrl: './register-report.component.html',
  styleUrls: ['./register-report.component.css']
})
export class RegisterReportComponent implements OnInit {
  @ViewChild('reportForm',{static:false})
  reportForm!:NgForm;
  reportID!:number
  reportData: Report={} as Report
  isEditMode=false

  constructor(private reportApi:ReportService,private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.reportID = Number(this.route.params.subscribe(params =>{
      if (params.id){
        const id = params.id;
        console.log (id);
      }
    }))
  }

  createReport():void{
    const newReport={description:this.reportData.description,id:this.reportID}
    this.reportApi.createCriticalReport(1,newReport).subscribe(()=>{})
  }
  onSubmit():void{
    if(this.reportForm.form.valid){
      console.log(this.reportData);
      if(this.isEditMode){
        console.log('Actualizando')
      }else{

      }
    }else{
      console.log('Invalid Data')
    }
  }
}
