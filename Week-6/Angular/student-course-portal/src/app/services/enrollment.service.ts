import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { CourseService } from './course.service';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  private enrolledCourseIds: number[] = [];

  constructor(private courseService: CourseService) {}

  enroll(courseId: number): void {
    if (!this.isEnrolled(courseId)) {
      this.enrolledCourseIds.push(courseId);
    }
  }

  unenroll(courseId: number): void {
    this.enrolledCourseIds = this.enrolledCourseIds.filter(id => id !== courseId);
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  getEnrolledCourses(): Course[] {
    const allCourses = this.courseService.getCourses();
    return allCourses.filter(course => this.enrolledCourseIds.includes(course.id));
  }
}
