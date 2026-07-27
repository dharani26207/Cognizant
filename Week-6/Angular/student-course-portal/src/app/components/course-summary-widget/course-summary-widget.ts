import { Component } from '@angular/core';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  template: `
    <div class="summary-widget" style="padding: 1.5rem; border: 1px solid var(--border-color, #ccc); border-radius: 12px; margin: 1rem 0; background: var(--card-bg, #fff); box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
      <h3 style="margin-top: 0;">Course Summary Widget</h3>
      <p style="font-size: 1.1rem;">Total Courses: <strong style="color: var(--primary-color, #007bff);">{{ getCourseCount() }}</strong></p>
      <button (click)="addTestCourse()" class="btn-primary" style="padding: 0.5rem 1rem; background-color: #007bff; color: white; border: none; border-radius: 6px; cursor: pointer; transition: background-color 0.2s;">
        + Add Mock Course
      </button>
    </div>
  `
})
export class CourseSummaryWidget {
  constructor(private courseService: CourseService) {}

  getCourseCount(): number {
    return this.courseService.getCourses().length;
  }

  addTestCourse(): void {
    const nextId = this.courseService.getCourses().length + 1;
    this.courseService.addCourse({
      id: nextId,
      name: `Mock Course ${nextId}`,
      code: `MOCK${nextId}`,
      credits: 3,
      gradeStatus: 'pending'
    });
  }
}
