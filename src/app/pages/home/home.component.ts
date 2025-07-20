import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NotesService } from '../../core/services/notes/notes.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { INotes } from '../../shared/interfaces/inotes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
  export class HomeComponent implements OnInit {
  private readonly notesService = inject(NotesService);
  private readonly toastrService = inject(ToastrService);

  notesData: INotes[] = [];

  noteId: string = '';

  @ViewChild('updateModel') myEle!: ElementRef;

  addForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    content: new FormControl(null, [Validators.required]),
  });

  updateForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    content: new FormControl(null, [Validators.required]),
  });

  submitAddForm(): void {
    this.notesService.addNewNote(this.addForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.addForm.reset();
        //reset form
        this.toastrService.success('Your Note Added Successfully', 'GoodNotes');
        this.getAllUserNotes();
      },
    });
  }

  ngOnInit(): void {
    this.getAllUserNotes();
  }

  getAllUserNotes(): void {
    this.notesService.getUserNotes().subscribe({
      next: (res) => {
        console.log(res);
        this.notesData = res.notes;
      },
      error: (err) => {
        if (err.error.msg === 'not notes found') {
          this.notesData = [];
        }
      },
    });
  }

  setUpdataFormData(note: any, id: string): void {

    this.updateForm.patchValue({
      title: note.title,
      content: note.content,

    });
    this.noteId = id;
  }

  updateAllUserNotes(): void {
    this.notesService
      .updateNotes(this.noteId, this.updateForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.getAllUserNotes();
          this.hideModel();
        },
      });
  }

  showModel(): void {
    const model = this.myEle.nativeElement as HTMLElement;

    model.classList.remove('d-none');
  }

  hideModel(): void {
    const model = this.myEle.nativeElement as HTMLElement;

    model.classList.add('d-none');
  }

  @HostListener('document:click', ['$event']) onClick(event: PointerEvent) {
    // console.log(event.target);

    if (event.target === this.myEle.nativeElement) {
      this.hideModel();
    }
  }

  deleteUserNote(id: string): void {
    this.notesService.deleteNotes(id).subscribe({
      next: (res) => {
        console.log(res);
        this.getAllUserNotes();
      },
    });
  }

  confirmBox(id: string) {
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        );

        // delete

        this.deleteUserNote(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
      }
    });
  }
}
