import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Hero } from '../hero';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  // Создание Observable-потока heroes$ для хранения списка героев
  // pipe() добавляет операторы для преобразования потока
  // map() берет массив всех героев и возвращает только элементы с 1 по 4 индекс (2-5 героев)
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