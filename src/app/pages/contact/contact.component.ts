import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

   contactForm!: FormGroup;

  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      message: new FormControl(null, [Validators.required])
    });
  }

  submitContactForm() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      this.toastr.success('Message sent successfully!', 'Contact');
      this.contactForm.reset();
    } else {
      this.toastr.error('Please fill all required fields.', 'Error');
    }
  }
}
