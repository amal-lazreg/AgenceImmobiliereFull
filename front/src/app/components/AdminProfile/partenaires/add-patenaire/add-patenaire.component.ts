import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartenaireService } from 'src/app/services/partenaire.service';

@Component({
  selector: 'app-add-patenaire',
  templateUrl: './add-patenaire.component.html',
  styleUrls: ['./add-patenaire.component.css']
})
export class AddPatenaireComponent implements OnInit {

  public selectedFiles: FileWithPreview[] = [];


  constructor(private router: Router,private service: PartenaireService){}

  ngOnInit(): void {
  }

  onFileChange(event: any) {
    this.selectedFiles = Array.from(event.target.files);
    this.selectedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        (file as any).dataUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  addNewPartner() {
    const formData = new FormData();

    this.selectedFiles.forEach(file => {
      formData.append('photos', file);
    });

    this.service.addPartenaire(formData).subscribe(
      {
        next: (res) => {
          console.log('res : ',res);
          this.router.navigate(['/getAllpartenaires']);
        }, error: (error) => {
          console.log('error : ', error);
        }
      }
    );
  }

}
