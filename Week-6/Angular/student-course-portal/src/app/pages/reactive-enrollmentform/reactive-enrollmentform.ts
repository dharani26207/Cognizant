import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';

// Custom synchronous validator function that detects a course code prefix of 'XX'
export function noCourseCode(control: AbstractControl): ValidationErrors | null {
  const val = control.value;
  if (val && typeof val === 'string' && val.toUpperCase().startsWith('XX')) {
    return { noCourseCode: true };
  }
  return null;
}

// Custom async validator simulating email check that takes 800ms
export function simulateEmailCheck(control: AbstractControl): Promise<ValidationErrors | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const email = control.value;
      if (email && typeof email === 'string' && email.includes('test@')) {
        resolve({ emailTaken: true });
      } else {
        resolve(null);
      }
    }, 800);
  });
}

@Component({
  selector: 'app-reactive-enrollmentform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-enrollmentform.html',
  styleUrl: './reactive-enrollmentform.css',
})
export class ReactiveEnrollmentform implements OnInit {
  enrollForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      studentEmail: [
        '',
        [Validators.required, Validators.email],
        [simulateEmailCheck],
      ],
      courseId: ['', [Validators.required, noCourseCode]],
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      additionalCourses: this.fb.array([]),
    });
  }

  /*
   * WHY A TYPED GETTER IS BETTER THAN CASTING IN THE TEMPLATE:
   * - Strong Typing: It provides compiler validation and IDE autocomplete inside the template file.
   * - Readability: Keeps the HTML template clean of complex TypeScript casting logic like (formGroup.get('x') as FormArray).
   * - Maintainability: If the form structure changes, the code is refactored easily in one place in the class.
   */
  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  get additionalCourseControls(): FormControl[] {
    return this.additionalCourses.controls as FormControl[];
  }

  addCourse(): void {
    this.additionalCourses.push(this.fb.control('', Validators.required));
  }

  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  onSubmit(): void {
    if (this.enrollForm.valid) {
      /*
       * DIFFERENCE BETWEEN value AND getRawValue():
       * - enrollForm.value: Excludes values of controls that are disabled (i.e. status: 'DISABLED').
       * - enrollForm.getRawValue(): Includes all control values in the form group, even if they are disabled.
       */
      console.log('Form Value (excluding disabled):', this.enrollForm.value);
      console.log('Form Raw Value (including disabled):', this.enrollForm.getRawValue());
      this.submitted = true;
    }
  }

  onReset(): void {
    this.enrollForm.reset({
      preferredSemester: 'Odd',
      agreeToTerms: false,
    });
    this.additionalCourses.clear();
    this.submitted = false;
  }
}
