import { Component, NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { combineLatest } from 'rxjs';
import { AProposComponent } from './components/a-propos/a-propos.component';
import { AdminProfileComponent } from './components/AdminProfile/admin-profile/admin-profile.component';
import { AddPatenaireComponent } from './components/AdminProfile/partenaires/add-patenaire/add-patenaire.component';
import { GetAllPartenaireComponent } from './components/AdminProfile/partenaires/get-all-partenaire/get-all-partenaire.component';
import { UpdateProfileComponent } from './components/AdminProfile/update-profile/update-profile.component';
import { AddAnnouncementComponent } from './components/Announcement/add-announcement/add-announcement.component';
import { DetailsComponent } from './components/Announcement/details/details.component';
import { GetAllAnnouncementComponent } from './components/Announcement/get-all-announcement/get-all-announcement.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AllComponent } from './components/posts/all/all.component';
import { AlouerComponent } from './components/posts/alouer/alouer.component';
import { AvendreComponent } from './components/posts/avendre/avendre.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfilComponent } from './components/user-profil/user-profil.component';

const routes: Routes = [

  { path: "", component: HomePageComponent },
  { path: "signup", component: SignupComponent },
  { path: "signin", component: SigninComponent },
  { path: "userProfile", component: UserProfilComponent },
  { path: "adminProfile", component: AdminProfileComponent },
  { path: "getAllAnnouncement", component: GetAllAnnouncementComponent} ,
  { path: "addAnnouncement", component: AddAnnouncementComponent},
  { path: "updateProfile", component: UpdateProfileComponent },
  {path: "alouer", component: AlouerComponent},
  {path: "avendre", component: AvendreComponent} ,
  {path: "all" , component: AllComponent},
  {path: "getAllpartenaires", component: GetAllPartenaireComponent},
  {path: "addPartner", component: AddPatenaireComponent},
  {path: "detailsAnnouce/:id", component: DetailsComponent},
  {path: "aPropos", component: AProposComponent},
  {path: "contact", component: ContactComponent},

 

 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
