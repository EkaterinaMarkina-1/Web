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
  heroes$: Observable<Hero[]>;
  private refresh$ = new Subject<void>();

  constructor(private heroService: HeroService) {
    this.heroes$ = this.refresh$.pipe(
      startWith(undefined),
      switchMap(() => this.heroService.getHeroes())
    );
  }

  add(name: string): void {
    name = name.trim();
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
