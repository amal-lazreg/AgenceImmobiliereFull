import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Annonce } from 'src/app/class/annonce';
import { AnnonceService } from 'src/app/services/annonce.service';

@Component({
  selector: 'app-a-propos',
  templateUrl: './a-propos.component.html',
  styleUrls: ['./a-propos.component.css']
})
export class AProposComponent implements OnInit {

  annonces: any;
  currentPhotoIndex: number = 0; // Index de la photo actuelle
  firstThreeAnnoncesrents: Annonce[] = [];


  constructor(private service: AnnonceService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getAnnonce() ;
   
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