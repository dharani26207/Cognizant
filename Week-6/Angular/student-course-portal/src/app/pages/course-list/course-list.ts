import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { CourseCard } from '../../components/course-card/course-card';
import { Course } from '../../models/course.model';

import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-list',
  imports: [NgIf, NgFor, CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  isLoading = true;
  selectedCourseId: number | null = null;
  courses: Course[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courses = this.courseService.getCourses();
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
