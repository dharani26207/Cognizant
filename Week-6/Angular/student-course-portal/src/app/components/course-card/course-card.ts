import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NgClass, NgIf, NgStyle, NgSwitch, NgSwitchCase } from '@angular/common';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { Highlight } from '../../directives/highlight';
import { Course } from '../../models/course.model';
import { EnrollmentService } from '../../services/enrollment.service';

@Component({
  selector: 'app-course-card',
  imports: [NgIf, NgClass, NgStyle, NgSwitch, NgSwitchCase, CreditLabelPipe, Highlight],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard implements OnChanges {
  @Input() course!: Course;
  @Output() enrollRequested = new EventEmitter<number>();

  isExpanded = false;

  constructor(private enrollmentService: EnrollmentService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      console.log(
        'CourseCard ngOnChanges — previous:',
        changes['course'].previousValue,
        'current:',
        changes['course'].currentValue
      );
    }
  }

  toggleEnroll(): void {
    if (this.enrollmentService.isEnrolled(this.course.id)) {
      this.enrollmentService.unenroll(this.course.id);
    } else {
      this.enrollmentService.enroll(this.course.id);
    }
  }

  isEnrolled(): boolean {
    return this.enrollmentService.isEnrolled(this.course.id);
  }

  // Getters keep templates clean by moving conditional class logic into the component class.
  get cardClasses(): Record<string, boolean> {
    return {
      'card--enrolled': this.enrollmentService.isEnrolled(this.course.id),
      'card--full': (this.course?.credits ?? 0) >= 4,
      expanded: this.isExpanded,
    };
  }

  get borderColor(): string {
    switch (this.course?.gradeStatus) {
      case 'passed':
        return 'green';
      case 'failed':
        return 'red';
      default:
        return 'grey';
    }
  }

  toggleExpanded(): void {
    this.isExpanded = !this.isExpanded;
  }
}
