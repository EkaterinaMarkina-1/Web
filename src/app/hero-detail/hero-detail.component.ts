import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroDetailComponent {
  hero$: Observable<Hero>;
  heroForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private fb: FormBuilder
  ) {
    this.heroForm = this.fb.group({
      name: [''],
      power: [''],
      level: [''],
      health: [''],
      attack: [''],
      defense: ['']
    });

    this.hero$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.heroService.getHero(id);
      })
    );

    this.hero$.subscribe(hero => {
      this.heroForm.patchValue({
        name: hero.name,
        power: hero.power || '',
        level: hero.level || '',
        health: hero.health || '',
        attack: hero.attack || '',
        defense: hero.defense || ''
      });
    });
  }

  save(): void {
    this.hero$.pipe(
      switchMap(hero => {
        const updatedHero = { ...hero, ...this.heroForm.value };
        return this.heroService.updateHero(updatedHero);
      })
    ).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
