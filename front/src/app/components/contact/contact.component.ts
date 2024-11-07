import { Component, OnInit } from '@angular/core';
import { MailService } from 'src/app/services/mail.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactData = {
    nom: '',
    prenom: '',
    email: '',
    message: ''
  };


  constructor(private service : MailService){

  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.service.sendContactData(this.contactData).subscribe({
        next:(res) => {
          console.log('Message envoyé avec succès!', res);
          alert('Your message has been sent successfully!');
        },
        error : (error) => {
          console.error('Erreur lors de l\'envoi du message', error);
          alert('Une erreur est survenue lors de l\'envoi de votre message.');
        }
      }
      );
  }

 
}
