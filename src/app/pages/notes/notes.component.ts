import { Component } from '@angular/core';

@Component({
  selector: 'app-notes',
  imports: [],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent {
  closeModal() {

    const modal = document.getElementById('myModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }
}
