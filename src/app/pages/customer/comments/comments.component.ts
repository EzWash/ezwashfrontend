import { Component, OnInit } from '@angular/core';
import {Staff} from "../../../model/accounts/staff";
import {NgForm} from "@angular/forms";
import {Comment} from "../../../model/business/comment";
import {CommentApiService} from "../../../service/business/comment/comment-api.service";
import {MatDialog} from "@angular/material/dialog";
import {TokenStorageService} from "../../../service/token-storage.service";
import {Carwash} from "../../../model/accounts/carwash";
import {AddDone} from "../../carwash/home-car-wash/home-car-wash.component";
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  commentForm!:NgForm;
  commentData:Comment={} as Comment
  carWashList: Carwash[]=[]
  isEditMode=false
  constructor(private commentApi:CommentApiService, public dialog:MatDialog, private tokenStorageService:TokenStorageService) { }

  ngOnInit(): void {

  }

  createComment(i:number):void{
    const newComment={description:this.commentData.description,qualification:this.commentData.qualification}
    this.commentApi.postComment(this.tokenStorageService.getUser().id,i,newComment).subscribe(()=>{
      this.openDialogAdd();
    })
  }

  openDialogAdd() {
    const d= this.dialog.open(AddDone);
    d.afterClosed().subscribe(result =>{
      window.location.reload();
    })
  }

  onSubmit():void{
    if(this.commentForm.form.valid){
      console.log(this.commentData);
      if(this.isEditMode){
        console.log('Actualizando')
      }else{

      }
    }else{
      console.log('Invalid Data')
    }
  }
}
