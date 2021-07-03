import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Comment} from "../../../model/business/comment";
import {CommentApiService} from "../../../service/business/comment/comment-api.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-rate-service',
  templateUrl: './rate-service.component.html',
  styleUrls: ['./rate-service.component.css']
})
export class RateServiceComponent implements OnInit {
  @ViewChild('rateForm',{static:false})
  rateForm!:NgForm;
  commentID!:number
  commentData:Comment={} as Comment
  isEditMode=false
  constructor(private commentService:CommentApiService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.commentID=Number(this.route.params.subscribe(params=>{
      if(params.id){
        const id=params.id;
        console.log(id);
      }
    }))
  }
  createComment():void{
    const newComment={description:this.commentData.description,qualification:this.commentData.qualification,first_name:this.commentData.first_name,last_name:this.commentData.last_name,carwash_id:this.commentData.carwash_id,id:this.commentID}
    this.commentService.postComment(1,1,newComment).subscribe(()=>{})
  }
  onSubmit():void{
    if(this.rateForm.form.valid){
      console.log(this.commentData);
      if(this.isEditMode){
        console.log('Actualizando')
      }else{
        this.createComment()
      }
    }else{
      console.log('Invalid Data')
    }
  }

}
