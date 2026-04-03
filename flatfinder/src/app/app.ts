<<<<<<< HEAD
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
=======
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
>>>>>>> origin/dev-b

@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< HEAD
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('flatfinder');
}
=======
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {}
>>>>>>> origin/dev-b
