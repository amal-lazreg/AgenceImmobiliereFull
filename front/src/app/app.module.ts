import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfilComponent } from './components/user-profil/user-profil.component';
import { AdminProfileComponent } from './components/AdminProfile/admin-profile/admin-profile.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddAnnouncementComponent } from './components/Announcement/add-announcement/add-announcement.component';
import { GetAllAnnouncementComponent } from './components/Announcement/get-all-announcement/get-all-announcement.component';
import { AdminNavBarComponent } from './components/AdminProfile/admin-nav-bar/admin-nav-bar.component';
import {AnnonceService} from './services/annonce.service';
import { UpdateProfileComponent } from './components/AdminProfile/update-profile/update-profile.component';
import { AvendreComponent } from './components/posts/avendre/avendre.component';
import { AlouerComponent } from './components/posts/alouer/alouer.component';
import { AddPatenaireComponent } from './components/AdminProfile/partenaires/add-patenaire/add-patenaire.component';
import { GetAllPartenaireComponent } from './components/AdminProfile/partenaires/get-all-partenaire/get-all-partenaire.component';
import { DetailsComponent } from './components/Announcement/details/details.component';
import { AllComponent } from './components/posts/all/all.component';
import { AProposComponent } from './components/a-propos/a-propos.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http) ;
}

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    UserProfilComponent,
    AdminProfileComponent,
    HomePageComponent,
    NavbarComponent,
    AddAnnouncementComponent,
    GetAllAnnouncementComponent,
    AdminNavBarComponent,
    UpdateProfileComponent,
    AvendreComponent,
    AlouerComponent,
    AddPatenaireComponent,
    GetAllPartenaireComponent,
    DetailsComponent,
    AllComponent,
    AProposComponent,
    ContactComponent,
    FooterComponent,
 
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:HttpLoaderFactory,
        deps:[HttpClient]

      }
    }
    )
  ],
  providers: [AnnonceService,HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
