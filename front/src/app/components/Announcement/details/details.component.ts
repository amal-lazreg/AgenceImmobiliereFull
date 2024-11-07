import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, TitleStrategy } from '@angular/router';
import { Annonce } from 'src/app/class/annonce';
import { AnnonceService } from 'src/app/services/annonce.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent  implements OnInit {

  annonces: any;
  currentPhotoIndex: number = 0; // Index de la photo actuelle
  firstThreeAnnoncesrents: Annonce[] = [];


  constructor(private service: AnnonceService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getAnnonce() ;
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.service.getAnnonce(id).subscribe(
        (data) => {
          this.annonces = data;
          // Transform the first photo path initially
          this.annonces.photos = this.annonces.photos.map((photo: string) => 
            photo.replace('C:\\Users\\lazre\\Desktop\\stage\\frontend\\src\\', '../../../../')
          );
        },
        (error) => {
          console.error('Erreur lors de la récupération des détails', error);
        }
      );
    }
    //this.getAnnonce() ;
  }

  // Retourne l'URL de la photo actuelle
  currentPhotoUrl(): string {
    return this.annonces.photos[this.currentPhotoIndex];
  }

  // Passe à la photo précédente
  previousPhoto() {
    if (this.currentPhotoIndex > 0) {
      this.currentPhotoIndex--;
    }
  }

  // Passe à la photo suivante
  nextPhoto() {
    if (this.currentPhotoIndex < this.annonces.photos.length - 1) {
      this.currentPhotoIndex++;
    }
  }

  getAnnonce() {
    this.service.getAllAnnonce().subscribe(
      data => {

        this.annonces = data
        for (var i=0; i<this.annonces.length;i++){
          this.annonces[i].photos[0] = this.annonces[i].photos[0].replace('C:\\Users\\lazre\\Desktop\\stage\\frontend\\src\\', '../../../../')
        }

        const filteredAnnonces: Annonce[] = this.annonces;


        this.firstThreeAnnoncesrents = filteredAnnonces.slice(0, 3) ;

      },
      error => {
        console.log(error);
      }

    )
  }
}