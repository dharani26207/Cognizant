import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private courses: Course[] = [
    { id: 1, name: 'Introduction to Angular', code: 'CS101', credits: 3, gradeStatus: 'passed' },
    { id: 2, name: 'TypeScript Fundamentals', code: 'CS102', credits: 1, gradeStatus: 'pending' },
    { id: 3, name: 'Web Development', code: 'CS201', credits: 4, gradeStatus: 'failed' },
    { id: 4, name: 'Database Systems', code: 'CS301', credits: 3, gradeStatus: 'pending' },
    { id: 5, name: 'Software Engineering', code: 'CS401', credits: 3, gradeStatus: 'passed' },
  ];

  getCourses(): Course[] {
    return this.courses;
  }

  getCourseById(id: number): Course | undefined {
    return this.courses.find(c => c.id === id);
  }

  addCourse(course: Course): void {
    this.courses.push(course);
  }
}
