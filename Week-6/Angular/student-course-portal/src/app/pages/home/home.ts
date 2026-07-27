import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CourseService } from '../../services/course.service';
import { CourseSummaryWidget } from '../../components/course-summary-widget/course-summary-widget';

@Component({
  selector: 'app-home',
  imports: [FormsModule, NgIf, CourseSummaryWidget],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  portalName = 'Student Course Portal';
  isPortalActive = true;
  message = '';
  searchTerm = '';
  coursesAvailable = 0;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.coursesAvailable = this.courseService.getCourses().length;
    console.log('HomeComponent initialised — courses loaded');
  }

  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }

  onEnrollClick(): void {
    this.message = 'Enrollment opened!';
  }

  /*
   * [property] is one-way binding: component → DOM (sets a DOM property from the component).
   * [(ngModel)] is two-way binding: DOM ↔ component (updates both when the user types or the code changes the value).
   */
}
