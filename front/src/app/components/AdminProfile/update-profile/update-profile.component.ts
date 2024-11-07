import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/class/user';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  public user = new User();

  adminId: string | null = null;
  username: any

  successMessage: string | null = null;


  constructor(private service: AdminService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.username = localStorage.getItem('username')
    this.getUser()
  }



  // updateAdminProfile() {
  // if (this.adminId) {
  // this.service.updateProfile(this.adminId, this.user).subscribe(
  // (response) => {
  // console.log('Profil mis à jour', response);
  //},
  //(error) => {
  // console.error('Erreur de mise à jour', error);
  // }
  //);
  // }
  //}

  getUser() {
    this.service.getUser(this.username).subscribe({
      next: (res:any) => {
        this.user = res.user[0]
        console.log(this.user)
      }, error: (err) => {

      }
    })
  }
  update(f: NgForm) {
    let data = f.value;

    // let body : User = {
    //   username : data.username,
    //   email : data.email,
    //   password : data.password
    // }


    // Ajouter des données à formData

    this.service.updateProfile(this.user._id, data).subscribe({
      next: (res) => {
        console.log('Profil mis à jour avec succès');
        this.successMessage = 'Votre profil a été modifié avec succès.';

      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour:', error);
      }
    });
  }
}
