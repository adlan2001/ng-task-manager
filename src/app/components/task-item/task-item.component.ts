import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Task } from '../../services/task.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-task-item',
  imports: [CommonModule, RouterModule, MatCardModule, MatIconModule, MatCheckboxModule, FormsModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() toggle = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();
  @Output() edit = new EventEmitter<{id: number; title:string}>();

  editing= false;
  editedTitle = '';

  startEditing() {
    this.editing = true;
    this.editedTitle = this.task.title;
  }
  
  saveEdit() {
    if (this.editedTitle.trim() && this.editedTitle !== this.task.title) {
      this.edit.emit({ id: this.task.id, title: this.editedTitle.trim() });
    }
    this.editing = false;
  }

  cancelEdit() {
    this.editing = false;
  }

  onToggle() {
    this.toggle.emit(this.task);
  }

  onDelete() {
    this.delete.emit(this.task);
  }
}
