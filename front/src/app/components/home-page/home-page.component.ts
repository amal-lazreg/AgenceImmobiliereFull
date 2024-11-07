import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Annonce } from 'src/app/class/annonce';
import { AnnonceService } from 'src/app/services/annonce.service';
import { PartenaireService } from 'src/app/services/partenaire.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  annonces: any;

  carouselItems: Annonce[][] = [];

  firstThreeAnnoncesSales: Annonce[] = [];

  firstThreeAnnoncesrents: Annonce[] = [];
  annonceDetails: any;

  partenaires: any[] = [];
  filteredPartenaires: any[] = [];

  groupedPartenaires: any[][] = [];

  





 

  constructor(private service: AnnonceService, private router: Router, private partenaireService : PartenaireService){}


  ngOnInit(): void {
    this.getSaleAnnonce();
    this.getRentAnnonce();
    this.partenaireService.getAllPartenaire().subscribe((partenaires: any[]) => {
        this.partenaires = partenaires;
        for (let i = 0; i < this.partenaires.length; i++) {
            for (let j = 0; j < this.partenaires[i].photos.length; j++) {
                this.partenaires[i].photos[j] = this.partenaires[i].photos[j].replace('C:\\Users\\lazre\\Desktop\\stage\\frontend\\src\\', '../../../../');
            }
        }
        this.filteredPartenaires = this.partenaires; // Ensure filteredPartenaires is populated
      });
}




  getSaleAnnonce() {
    this.service.getAllAnnonce().subscribe(
      data => {

        this.annonces = data
        for (var i=0; i<this.annonces.length;i++){
          this.annonces[i].photos[0] = this.annonces[i].photos[0].replace('C:\\Users\\lazre\\Desktop\\stage\\frontend\\src\\', '../../../../')
        }

        const filteredAnnonces: Annonce[] = this.annonces.filter((annonce: Annonce) => annonce.transactionType === 'a vendre');

        this.firstThreeAnnoncesSales = filteredAnnonces.slice(0, 3);
        console.log(this.firstThreeAnnoncesSales);
        console.log(data);
      },
      error => {
        console.log(error);
      }

    )
  }


  getRentAnnonce() {
    this.service.getAllAnnonce().subscribe(
      data => {

        this.annonces = data
        for (var i=0; i<this.annonces.length;i++){
          this.annonces[i].photos[0] = this.annonces[i].photos[0].replace('C:\\Users\\lazre\\Desktop\\stage\\frontend\\src\\', '../../../../')
        }

        const filteredAnnonces: Annonce[] = this.annonces.filter((annonce: Annonce) => annonce.transactionType === 'a louer');

        this.firstThreeAnnoncesrents = filteredAnnonces.slice(0, 3);
        console.log(this.firstThreeAnnoncesrents);
        console.log(data);
      },
      error => {
        console.log(error);
      }

    )
  }

  showDetails(id: any) {
    this.service.getAnnonce(id).subscribe(
        (data) => {
            this.annonces = data;
            this.annonces[0].photos[0] = this.annonces[0].photos[0].replace('C:\\Users\\lazre\\Desktop\\stage\\frontend\\src\\', '../../../../')

        },
        (error) => {
            console.error('Erreur lors de la récupération des détails', error);
        }
    );
}




}
