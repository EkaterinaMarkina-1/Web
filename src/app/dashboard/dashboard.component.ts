import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Hero } from '../hero';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { HeroService } from '../hero.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  heroes$: Observable<Hero[]> = this.heroService.getHeroes().pipe(
    map((heroes: Hero[]) => heroes.slice(1, 5))
      );
      constructor(private heroService: HeroService) {}
    }

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/