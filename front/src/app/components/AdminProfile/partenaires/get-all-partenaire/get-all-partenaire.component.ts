import { Component, OnInit } from '@angular/core';
import { PartenaireService } from 'src/app/services/partenaire.service';

@Component({
  selector: 'app-get-all-partenaire',
  templateUrl: './get-all-partenaire.component.html',
  styleUrls: ['./get-all-partenaire.component.css']
})
export class GetAllPartenaireComponent implements OnInit {

  partenaires : any

  filteredPartenaires: any[] = [];


  constructor(private service : PartenaireService){}


  ngOnInit() {
    this.service.getAllPartenaire().subscribe((partenaires: any[]) => {
      this.partenaires = partenaires;
      for (let i = 0; i < this.partenaires.length; i++) {
          for (let j = 0; j < this.partenaires[i].photos.length; j++) {
              this.partenaires[i].photos[j] = this.partenaires[i].photos[j].replace('C:\\Users\\lazre\\Desktop\\stage\\frontend\\src\\', '../../../../');
          }
      }
      this.filteredPartenaires = this.partenaires; // Ensure filteredPartenaires is populated
    });
  }



}
