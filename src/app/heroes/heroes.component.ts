import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Observable, Subject } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroesComponent {
  // Observable поток для хранения списка героев
  heroes$: Observable<Hero[]>;
  
  // Subject для ручного триггера обновления данных
  private refresh$ = new Subject<void>();

  // Конструктор с Dependency Injection
  constructor(private heroService: HeroService) {
    // Инициализация потока heroes$
    this.heroes$ = this.refresh$.pipe(
      // startWith запускает поток сразу при создании
      startWith(undefined),
      // switchMap отменяет предыдущий запрос при новом обновлении
      switchMap(() => this.heroService.getHeroes())
    );
  }

  add(name: string): void {
    name = name.trim();  // Удаляем лишние пробелы
    if (!name) return;
    
    this.heroService.addHero({ name } as Hero).subscribe(() => {
      this.refresh$.next(); // Триггер обновления
    });
  }

  delete(hero: Hero): void {
    this.heroService.deleteHero(hero.id).subscribe(() => {
      this.refresh$.next(); // Триггер обновления
    });
  }
}
