import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule, NgIf  } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UtilsService } from 'app/services/utils';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule, NgIf],
})
export class ImageDialogComponent implements OnInit {

  ipUrl: string;
  fileUrl: SafeResourceUrl;
  isImage: boolean;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer,
    private _util: UtilsService,
    public dialogRef: MatDialogRef<ImageDialogComponent>,
  ) {
    this.ipUrl = _util.getIp();
  }

  ngOnInit(): void {

    const image = this.data.url_image.toString()

    if (image.startsWith('data:')) 
    {   
      this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(image);

      this.isImage = true;

    } else 
    {  
      this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.ipUrl + this.data.url_image);
      
      this.isImage = this.validateImage();
    } 
  }
  
  validateImage(): boolean {
    return this.data.url_image.endsWith('.jpg') || this.data.url_image.endsWith('.jpeg') || this.data.url_image.endsWith('.png');
  }

}

