import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>) { }

  ngOnInit() {
  }
  sureDeleteContact(){
    this.dialogRef.close({ data: 'yes' });
   
    
  }

  onNoClick(){
    this.dialogRef.close({ data: 'no' });
  
  }
    
    
}
