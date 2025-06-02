import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  // Форма будет инициализирована позже (знак ! говорит TypeScript, что мы гарантируем это)
  heroForm!: FormGroup;
  // Текущий герой, данные которого редактируем
  hero!: Hero;
  hasExtendedProperties: boolean = false; // Флаг, есть ли доп. свойства

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // При инициализации компонента загружаем данные героя
    this.getHero();
  }

  getHero(): void {
    // Получаем ID героя из параметров маршрута
    const idParam = this.route.snapshot.paramMap.get('id');
    // Защита от отсутствия ID в URL
    if (!idParam) {
      console.error('ID is missing in URL');
      this.goBack();
      return;
    }

    // Конвертируем строковый ID в число
    const id = +idParam;
    this.heroService.getHero(id).subscribe(hero => {
      this.hero = hero;
      // Проверяем, есть ли у героя расширенные свойства
      // (проверяем наличие хотя бы одного свойства, например 'power')
      this.hasExtendedProperties = 'power' in hero;

      if (this.hasExtendedProperties) {
        this.heroForm = this.fb.group({
          name: [hero.name, Validators.required],
          power: [hero.power, Validators.required],
          level: [hero.level, [Validators.required, Validators.min(1)]],
          health: [hero.health, [Validators.required, Validators.min(1)]],
          attack: [hero.attack, [Validators.required, Validators.min(1)]],
          defense: [hero.defense, [Validators.required, Validators.min(1)]]
        });
      } else {
        this.heroForm = this.fb.group({
          name: [hero.name, Validators.required]
        });
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.heroForm.valid) {
      const updatedHero = {
        ...this.hero,
        ...this.heroForm.value
      };
      
      this.heroService.updateHero(updatedHero)
        .subscribe(() => this.goBack());
    }
  }
}
