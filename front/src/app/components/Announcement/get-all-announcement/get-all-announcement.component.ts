import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Annonce } from 'src/app/class/annonce';
import { AnnonceService } from 'src/app/services/annonce.service';


@Component({
  selector: 'app-get-all-announcement',
  templateUrl: './get-all-announcement.component.html',
  styleUrls: ['./get-all-announcement.component.css']
})
export class GetAllAnnouncementComponent implements OnInit {

  annonces: any;
  public selectedFiles: FileWithPreview[] = [];
  filteredAnnonces: any[] = [];
  selectedFilter: string = 'all'; 

  searchQuery: string = ''; // Search query




  paginatedAnnonces : any;
  currentPage = 1;
  itemsPerPage = 6;



  dataAnnonce={
    titre:'',
    adresse:'',
    type:'',
    surface:'',
    disponibilite:'',
    coordonnes:'',
    prix:'',
    photos:[''],
    _id:''
    }


  constructor(private service: AnnonceService, private router: Router,private imageCompress: NgxImageCompressService) { }


 

  ngOnInit() {
  this.getAllAnnonce() ;
  }

  transformPath(photoPath: string): string {
    return photoPath.replace('C:\\Users\\lazre\\Desktop\\stage\\frontend\\src\\', '../../../../');
  }
  
  onFileChange(event: any) {
    this.selectedFiles = Array.from(event.target.files);
    // Display the selected images
    this.selectedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        file['dataUrl'] = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  
  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedAnnonces = this.filteredAnnonces.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
  }

  get totalPages(): number {
    return Math.ceil(this.filteredAnnonces.length / this.itemsPerPage);
  }

  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  getAllAnnonce() {
    this.service.getAllAnnonces().subscribe((annonces: any[]) => {
      this.annonces = annonces.map(annonce => {
        if (annonce.photos && annonce.photos.length > 0) {
          annonce.photos[0] = this.transformPath(annonce.photos[0]);
        }
        return annonce;
      });
      this.applyFilters();
      this.updatePagination();
    });
  }

  filterAnnonces(transactionType: string) {
    this.selectedFilter = transactionType; 
    this.applyFilters();
    this.updatePagination();
  }
 
  searchAnnonces() {
    this.applyFilters();
  }

  applyFilters() {
    let filteredAnnonces = this.annonces;
    if (this.selectedFilter !== 'all') {
      filteredAnnonces = filteredAnnonces.filter((annonce: Annonce) => annonce.transactionType === this.selectedFilter);
    }
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filteredAnnonces = filteredAnnonces.filter((annonce: Annonce) =>
        (annonce.titre && annonce.titre.toLowerCase().includes(query)) ||
        (annonce.adresse && annonce.adresse.toLowerCase().includes(query)) ||
        (annonce.type && annonce.type.toLowerCase().includes(query)) ||
        (annonce.description && annonce.description.toLowerCase().includes(query)) ||
        (annonce.prix && annonce.prix.toLowerCase().includes(query)) ||
        (annonce.surface && annonce.surface.toLowerCase().includes(query)) ||
        (annonce.disponibilite && annonce.disponibilite.toLowerCase().includes(query)) ||
        (annonce.coordonnes && annonce.coordonnes.toLowerCase().includes(query)) ||
        (annonce.transactionType && annonce.transactionType.toLowerCase().includes(query))
      );
    }
    this.filteredAnnonces = filteredAnnonces;
  }
  
 



  delete(id: any) {
    if (confirm('Are you sure to delete record?')) {
      this.service.deleteAnnonce(id).subscribe(
        data => {

        },
        error => {
          console.log(error);
        }
      )
      window.location.reload();

    }
  }


  gatdata( titre:any,adresse:any,type:any,surface:any,disponibilite:any,coordonnes:any,prix:any,photos:any,_id:any){
      this.dataAnnonce.titre=titre;
      this.dataAnnonce.adresse=adresse;
      this.dataAnnonce.type=type;
      this.dataAnnonce.surface=surface;
      this.dataAnnonce.disponibilite=disponibilite;
      this.dataAnnonce.coordonnes=coordonnes;
      this.dataAnnonce.prix=prix;
      this.dataAnnonce.photos=photos;
      this.dataAnnonce._id=_id
      console.log(this.dataAnnonce)
      
      
  }


  update(f: NgForm) {
    let data = f.value;
    const formData = new FormData();

    // Append form data
    formData.append('titre', data.titre);
    formData.append('adresse', data.adresse);
    formData.append('type', data.type);
    formData.append('surface', data.surface);
    formData.append('disponibilite', data.disponibilite);
    formData.append('coordonnes', data.coordonnes);
    formData.append('prix', data.prix);

    // Append files to formData
    for (let file of this.selectedFiles) {
      formData.append('photos', file, file.name);
    }

    this.service.updateAnnonce(this.dataAnnonce._id, formData).subscribe({
      next: (res) => {
        console.log("Annonce mise à jour avec succès");
        window.location.reload();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }



    
}
