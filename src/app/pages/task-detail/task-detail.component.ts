import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TaskService, Task } from '../../services/task.service';
import { AppRoutingModule } from '../../app.routes';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-task-detail',
  imports: [ CommonModule, RouterLink ],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss'
})
export class TaskDetailComponent implements OnInit{
  task?: Task;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private location: Location
  ) {}

  goBack() {
    this.location.back();
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const found = this.taskService.getTasks().find(t => t.id === id);
    if (!found) {
      this.router.navigate(['/']); //redirect if not found
    } else {
      this.task = found;
    }
  }
}
