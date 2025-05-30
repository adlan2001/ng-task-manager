import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TaskService, Task } from '../../services/task.service';
import { TaskItemComponent } from '../task-item/task-item.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, FormsModule, TaskItemComponent, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  standalone: true,
})

export class TaskListComponent implements OnInit{
  tasks: Task[] = [];
  newTaskTitle = '';

  constructor(private taskService: TaskService, private snackBar: MatSnackBar) {}

  refresh () {
    this.tasks = this.taskService.getTasks();
  }
  
  ngOnInit() {
    this.refresh();
  }

  openSnackBar(text: string){
    this.snackBar.open(text, 'Close', {duration: 2000});
  }

  addTask() {
    if (!this.newTaskTitle.trim()) return;
    this.taskService.addTask(this.newTaskTitle);
      this.newTaskTitle = '';
    this.refresh();
    this.openSnackBar('Task added!');
  }

  editTask(change: { id: number; title: string}) {
    this.taskService.updateTask(change.id, change.title);
      this.refresh();
    this.openSnackBar('Task edited!')
  }

  toggleDone(task: Task) {
    this.taskService.toggleTaskDone(task.id);
      this.refresh();
    this.openSnackBar('Task updated!')
  }

  delete(task: Task) {
    this.taskService.deleteTask(task.id);
      this.refresh();
    this.openSnackBar('Task deleted!')
  }
}
