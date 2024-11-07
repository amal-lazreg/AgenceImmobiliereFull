// photo-upload.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Annonce } from 'src/app/class/annonce';
import { AnnonceService } from 'src/app/services/annonce.service';

@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.css']
})
export class AddAnnouncementComponent implements OnInit {

  public annonce = new Annonce();
  public selectedFiles: FileWithPreview[] = [];
  urls: string[] = [];


  constructor(private router: Router, private service: AnnonceService) { }

  ngOnInit(): void { }

  selectFiles(event: any) {
    if (event.target.files) {
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        this.selectedFiles.push(file);
  
        const reader = new FileReader();
        reader.readAsDataURL(file);
  
        reader.onload = (e: any) => {
          this.urls.push(e.target.result as string);
        };
      }
    }
  }

  addNewAnnonce() {
    const formData = new FormData();
    formData.append('title', this.annonce.titre || '');
    formData.append('description', this.annonce.description || '');
    formData.append('address', this.annonce.adresse || '');
    formData.append('type', this.annonce.type || '');
    formData.append('price', this.annonce.prix || '');
    formData.append('surface', this.annonce.surface || '');
    formData.append('disponibilite', this.annonce.disponibilite || '');
    formData.append('coordonnee', this.annonce.coordonnes || '');
    formData.append('transactionType',this.annonce.transactionType || '');
    this.selectedFiles.forEach(file => {
      formData.append('photos', file);
    });

    this.service.addAnnonce(formData).subscribe(
      {
        next: (res) => {
          console.log('res : ',res);
          this.router.navigate(['/getAllAnnouncement']);
        }, error: (error) => {
          console.log('error : ', error);
        }
      }
    );
  }
}