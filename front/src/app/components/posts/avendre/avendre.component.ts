import { Component, OnInit } from '@angular/core';
import { Annonce } from 'src/app/class/annonce';
import { AnnonceService } from 'src/app/services/annonce.service';

@Component({
  selector: 'app-avendre',
  templateUrl: './avendre.component.html',
  styleUrls: ['./avendre.component.css']
})
export class AvendreComponent implements OnInit {

  annonces: any;
  filteredAnnonces: any[] = [];
  selectedFilter: string = 'a vendre'; 
  searchQuery: string = ''; 
  currentPage: number = 1;
  itemsPerPage: number = 6; // Number of items per page
  paginatedAnnonces: any[] = [];

  constructor(private service: AnnonceService){}

  ngOnInit(): void {
    this.getAllAnnonce();
  }

  transformPath(photoPath: string): string {
    return photoPath.replace('C:\\Users\\lazre\\Desktop\\stage\\frontend\\src\\', '../../../../');
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
    this.updatePagination();
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
}