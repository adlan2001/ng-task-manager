import { Injectable } from '@angular/core';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private storageKey = 'tasks';
  private tasks: Task [] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const storedTasks = localStorage.getItem(this.storageKey);
    this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
  }

  private saveToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
  }

  getTasks(): Task[] {
    return [...this.tasks];
  }

  addTask(title: string): void {
    const newTask: Task = {
      id: Date.now(),
      title,
      done: false,
    };
    this.tasks.push(newTask);
    this.saveToStorage();
  }

  updateTask(id:number, newTitle: string): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.title = newTitle;
      this.saveToStorage()
    }
  }

  toggleTaskDone(taskId: number): void {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.done = !task.done;
      this.saveToStorage();
    }
  }

  deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter(t => t.id !== taskId);
    this.saveToStorage();
  }
}
