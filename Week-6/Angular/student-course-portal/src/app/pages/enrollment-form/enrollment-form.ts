import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-enrollment-form',
  imports: [FormsModule, NgIf],
  templateUrl: './enrollment-form.html',
  styleUrl: './enrollment-form.css',
})
export class EnrollmentForm {
  studentName = '';
  studentEmail = '';
  courseId: number | null = null;
  preferredSemester = 'Odd';
  agreeToTerms = false;
  submitted = false;

  onSubmit(form: NgForm): void {
    console.log(form.value);
    console.log(form.valid);
    if (form.valid) {
      this.submitted = true;
    }
  }

  onReset(form: NgForm): void {
    form.resetForm();
    this.submitted = false;
  }
}
