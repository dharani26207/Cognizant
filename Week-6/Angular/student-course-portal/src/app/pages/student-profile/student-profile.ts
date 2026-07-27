import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css',
})
export class StudentProfile {
  student = {
    name: 'Dharani Kumar',
    id: 'S10248',
    email: 'dharani.kumar@student.portal',
    gpa: 3.8,
    major: 'Computer Science & Engineering',
    semester: '6th Semester (Even)',
    enrolledCourses: [
      { code: 'CS101', name: 'Introduction to Angular', credits: 3, grade: 'A' },
      { code: 'CS201', name: 'Web Development', credits: 4, grade: 'B+' },
      { code: 'CS401', name: 'Software Engineering', credits: 3, grade: 'A-' }
    ]
  };
}
