import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private store: Store<fromRoot.State>) {
    store.dispatch(new fromRoot.LoadState());
  }
}
