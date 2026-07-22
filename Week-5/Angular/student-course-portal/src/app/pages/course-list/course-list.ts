import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { CourseCard } from '../../components/course-card/course-card';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-list',
  imports: [NgIf, NgFor, CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  isLoading = true;
  selectedCourseId: number | null = null;

  courses: Course[] = [
    { id: 1, name: 'Introduction to Angular', code: 'CS101', credits: 3, gradeStatus: 'passed', enrolled: true },
    { id: 2, name: 'TypeScript Fundamentals', code: 'CS102', credits: 1, gradeStatus: 'pending' },
    { id: 3, name: 'Web Development', code: 'CS201', credits: 4, gradeStatus: 'failed', enrolled: false },
    { id: 4, name: 'Database Systems', code: 'CS301', credits: null, gradeStatus: 'pending' },
    { id: 5, name: 'Software Engineering', code: 'CS401', credits: 3, gradeStatus: 'passed', enrolled: true },
  ];

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  onEnroll(courseId: number): void {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
  }

  // trackBy lets Angular identify items by id so only changed rows re-render instead of the whole list.
  trackByCourseId(_index: number, course: Course): number {
    return course.id;
  }
}
