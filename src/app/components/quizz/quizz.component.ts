import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json'

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent implements OnInit {

ngOnInit(): void {
  if (quizz_questions) {
    this.finished = false;
    this.answers = 0;
    this.title = quizz_questions.title;

    this.resultClass = "";
    this.questionIndex = 0;
    this.questions = quizz_questions.questions;
    this.questionSelected = this.questions[this.questionIndex];
    this.questionMaxIndex = this.questions.length;
  }
}

title: string = "";
questions: any;
questionSelected: any;

answers: number = 0;
answerSelected: string = "";

questionIndex: number = 0;
questionMaxIndex: number = 0;

finished:boolean = false;
result: string = "";
resultClass: string = "";


playerChoice(value:string) {
  this.answers += Number(value);
  this.nextStep();
}

async nextStep() {
  this.questionIndex++;
  if (this.questionMaxIndex > this.questionIndex) {
    this.questionSelected = this.questions[this.questionIndex];
  }

  else {
    this.endGame();    
  }
  
}

endGame() {
  this.finished = true;
  this.result = this.answers < 0 ? quizz_questions.results['-1'] : quizz_questions.results['1'];
  this.resultClass = this.answers < 0 ? "villain" : "hero";
}

reload() {
  this.ngOnInit();
}


}

