import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoOfTheCourseComponent } from './video-of-the-course.component';

describe('VideoOfTheCourseComponent', () => {
  let component: VideoOfTheCourseComponent;
  let fixture: ComponentFixture<VideoOfTheCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoOfTheCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoOfTheCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
