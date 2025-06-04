import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Hero } from '../hero';
import { MessageService } from '../message.service';
import { HeroService } from '../hero.service';
import { Observable, Subject } from 'rxjs';
import { switchMap, startWith, tap } from 'rxjs/operators';

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
  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) {
    // Инициализация потока heroes$
    this.heroes$ = this.refresh$.pipe(
      // startWith запускает поток сразу при создании
      startWith(undefined),
      // switchMap отменяет предыдущий запрос при новом обновлении
      switchMap(() => this.heroService.getHeroes().pipe(
        tap(heroes => this.messageService.add(`HeroService: fetched ${heroes.length} heroes`))
      ))
    );
  }

  add(name: string): void {
    name = name.trim();  // Удаляем лишние пробелы
    if (!name) return;
    
    this.heroService.addHero({ name } as Hero).pipe(
      tap(hero => {
        this.messageService.add(`HeroService: added hero id=${hero.id}`);
        this.refresh$.next();
      })
    ).subscribe();
  }

  delete(hero: Hero): void {
    this.heroService.deleteHero(hero.id).pipe(
      tap(() => {
        this.messageService.add(`HeroService: deleted hero id=${hero.id}`);
        this.refresh$.next();
      })
    ).subscribe();
  }
}
