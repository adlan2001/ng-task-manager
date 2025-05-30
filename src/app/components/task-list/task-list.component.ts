import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  standalone: true,
})
export class TaskListComponent {
  tasks = [
    { id: 1, title: 'Learn Angular', done: false },
    { id: 2, title: 'Build a project', done: false }
  ];

  newTaskTitle = '';

  addTask() {
    if (!this.newTaskTitle.trim()) return;

    const newTask = {
      id: Date.now(),
      title: this.newTaskTitle,
      done: false,
    };

    this.tasks.push(newTask);
    this.newTaskTitle = '';
  }
}
