import {Component, OnInit} from '@angular/core';
import {VideoService} from "../_services/video.service";
import {ActivatedRoute} from "@angular/router";
import {AnswerDto} from "../_models/answer-dto";
import {UserService} from "../_services/user.service";
import {User} from "../_models/user";
import {PageEvent} from "@angular/material/paginator";
import { RatingConfig } from 'ngx-bootstrap/rating';

export function getRatingConfig(): RatingConfig {
  return Object.assign(new RatingConfig(), { ariaLabel: 'My Rating' });
}


@Component({
  selector: 'app-view-answer',
  templateUrl: './view-answer.component.html',
  styleUrls: ['./view-answer.component.css'],
  providers: [{ provide: RatingConfig, useFactory: getRatingConfig }]
})
export class ViewAnswerComponent implements OnInit{

  answers: AnswerDto[] = [];
  videoId: string | null | undefined;
  usersMap: { [key: string]: User } = {};

  //pagination
  page = 1;
  pageSize = 5;
  startIndex = 0;
  endIndex = 5;
  collectionSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  public pageSlice : AnswerDto[] = [];

  currentSortColumn: string = '';
  sortDirection: string = 'asc';

  //evaluation
  evaluations: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  handlePageEvent(e: PageEvent) {
    this.startIndex = e.pageIndex * e.pageSize;
    this.endIndex = (e.pageIndex + 1) * e.pageSize;
    if(this.endIndex>this.collectionSize){
      this.endIndex = this.collectionSize;
    }
    this.pageSlice = this.answers.slice(this.startIndex, this.endIndex);

  }

  constructor(private videoService: VideoService,
              private activatedRoute: ActivatedRoute,
              private userService: UserService

              ) {
  }

  ngOnInit() {
    this.videoId = this.activatedRoute.snapshot.paramMap.get('videoId');

    if (this.videoId != null) {
      this.videoService.getAnswerByVideoId(this.videoId).subscribe(
        (answers: AnswerDto[]) => {
          this.answers = answers;
          this.collectionSize = answers.length;
          this.pageSlice = this.answers.slice(0, 5)
          this.loadUserNames(); // Вызов метода для загрузки имен пользователей
        },
        (error) => {
          console.log('Error retrieving answer: ', error);
        }
      );
    }
  }

  sortByAuthor() {
    if (this.currentSortColumn === 'author') {
      if (this.sortDirection === 'asc') {
        this.sortDirection = 'desc';
      } else if (this.sortDirection === 'desc') {
        // Удаление сортировки и возврат к исходной коллекции
        this.currentSortColumn = '';
        this.sortDirection = '';
        this.pageSlice = this.answers.slice(this.startIndex, this.endIndex);
        return; // Выходим из метода, чтобы не выполнять сортировку
      }
    } else {
      this.currentSortColumn = 'author';
      this.sortDirection = 'asc';
    }

    this.pageSlice.sort((a, b) => {
      const compareResult = a.authorName.localeCompare(b.authorName);
      return this.sortDirection === 'asc' ? compareResult : -compareResult;
    });

  }

  sortByDate() {
    if (this.currentSortColumn === 'date') {
      if (this.sortDirection === 'asc') {
        this.sortDirection = 'desc';
      } else if (this.sortDirection === 'desc') {
        // Удаление сортировки и возврат к исходной коллекции
        this.currentSortColumn = '';
        this.sortDirection = '';
        this.pageSlice = this.answers.slice(this.startIndex, this.endIndex);
        return; // Выходим из метода, чтобы не выполнять сортировку
      }
    } else {
      this.currentSortColumn = 'date';
      this.sortDirection = 'asc';
    }

    this.pageSlice.sort((a, b) => {
      const dateA = new Date(a.date_upload).getTime();
      const dateB = new Date(b.date_upload).getTime();
      const compareResult = dateA - dateB;
      return this.sortDirection === 'asc' ? compareResult : -compareResult;
    });
  }

  sortById() {
    if (this.currentSortColumn === 'id') {
      if (this.sortDirection === 'asc') {
        this.sortDirection = 'desc';
      } else if (this.sortDirection === 'desc') {
        // Удаление сортировки и возврат к исходной коллекции
        this.currentSortColumn = '';
        this.sortDirection = '';
        this.pageSlice = this.answers.slice(this.startIndex, this.endIndex);
        return; // Выходим из метода, чтобы не выполнять сортировку
      }
    } else {
      this.currentSortColumn = 'id';
      this.sortDirection = 'asc';
    }

    this.pageSlice.sort((a, b) => {
      const compareResult = a.id - b.id;
      return this.sortDirection === 'asc' ? compareResult : -compareResult;
    });
  }

  loadUserNames() {

    for (const answer of this.answers) {
      this.userService.getUserById(answer.authorId).subscribe(
        (data) => {
          console.log(data);
          answer.authorName = data.first_name + ' ' + data.last_name;
        },
        (error) => {
          console.log('Error retrieving user: ', error);
        }
      );
    }
  }

  editEvaluationUserById(answerId: number, selectedEvaluation: string) {
    const editData: any = {};

    editData.selectedEvaluation = selectedEvaluation;

    this.videoService.editEvaluationUserById(answerId, editData).subscribe(
      (response) => {
        const updatedAnswer = this.answers.find((answer) => answer.id === answerId);
        if (updatedAnswer) {
          updatedAnswer.evaluation = selectedEvaluation;

          updatedAnswer.selectedEvaluation = selectedEvaluation
        }
      },
      (error) => {
        console.log('Error editing user answer: ', error);
      }
    );
  }
}

@Component({
  selector: 'paginator-overview-example',
  templateUrl: 'paginator-overview-example.html',
})
export class PaginatorOverviewExample {


}
