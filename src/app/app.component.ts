import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet,RouterLink, RouterLinkActive,Router} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {


  constructor(private router: Router) { }

  title = 'taskAngular';

  ngOnInit() {
    this.router.navigate(['/user']);
  }

}



