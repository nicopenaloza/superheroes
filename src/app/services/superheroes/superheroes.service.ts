import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IServerResponse } from '../../interfaces/server-response.interface';
import { IPreSaveSuperhero, ISuperhero, ISuperheroService } from '../../interfaces/superheroes.interface';
import { HttpStatusCode } from '@angular/common/http';
import { SuperHero } from '../../models/superhero.model';

@Injectable({
  providedIn: 'root'
})
export class SuperHeroesService implements ISuperheroService {

  private _heroes: ISuperhero[] = [];
  private _onSuperheroesChange: BehaviorSubject<ISuperhero[]> = new BehaviorSubject<ISuperhero[]>(this._heroes);

  constructor() { }

  /**
   * Utilizo los timeout para simular los tiempos de respuesta de un servidor
   * real, en un servicio real, estos timeout no serían necesarios y seria 
   * reemplazado con llamadas http.
   */

  get onSuperheroesChange(): Observable<ISuperhero[]> {
    return this._onSuperheroesChange.asObservable();
  }

  getSuperheroes(): Observable<ISuperhero[]> {
    const response = new Subject<ISuperhero[]>();

    setTimeout(() => {
      response.next(this._heroes)
    }, 1000);

    return response.asObservable();
  };

  getSuperheroById(id: number): Observable<ISuperhero | null> {
    const response = new Subject<ISuperhero | null>();

    setTimeout(() => {
      response.next(this._heroes.find(hero => hero.id === id) ?? null)
    }, 1000);

    return response.asObservable();
  };

  getSuperheroesByName(name: string): Observable<ISuperhero[]> {
    const response = new Subject<ISuperhero[]>();

    setTimeout(() => {
      const filteredHeroes = this._heroes.filter(hero =>
        !name || hero.name.toLowerCase().includes(name?.trim().toLowerCase())
      );
      response.next(filteredHeroes);
    }, 1000);

    return response.asObservable();
  };

  addSuperhero(superhero: IPreSaveSuperhero): Observable<IServerResponse<ISuperhero>> {
    const response = new Subject<IServerResponse<ISuperhero>>();
    superhero.name = superhero.name.trim();

    setTimeout(() => {
      const _superhero: ISuperhero = new SuperHero(this._heroes.length, superhero.name, superhero.power, superhero.photo);

      this._heroes.push(_superhero);
      this._onSuperheroesChange.next(this._heroes);

      response.next({
        status: HttpStatusCode.Ok,
        message: 'Superheroe creado correctamente',
        data: _superhero
      })
    }, 1000);

    return response.asObservable();

  };

  updateSuperhero(superhero: ISuperhero): Observable<IServerResponse<ISuperhero>> {
    const response = new Subject<IServerResponse<ISuperhero>>();

    setTimeout(() => {
      const heroIndex = this._heroes.findIndex(hero => hero.id === superhero.id);
      if (heroIndex === -1) {
        response.error({
          status: HttpStatusCode.NotFound,
          message: 'Superhéroe no encontrado',
          data: null
        });
        return;
      }

      this._heroes[heroIndex] = superhero;
      this._onSuperheroesChange.next(this._heroes);

      response.next({
        status: HttpStatusCode.Ok,
        message: 'Superheroe creado correctamente',
        data: superhero
      })
    }, 1000);

    return response.asObservable();
  };

  deleteSuperhero(id: number): Observable<IServerResponse<ISuperhero>> {
    const response = new Subject<IServerResponse<ISuperhero>>();

    setTimeout(() => {
      const heroIndex = this._heroes.findIndex(hero => hero.id === id);
      if (heroIndex === -1) {
        response.error({
          status: HttpStatusCode.NotFound,
          message: 'Superhéroe no encontrado',
          data: null
        });
        return;
      }

      const deletedHero = this._heroes.splice(heroIndex, 1)[0];
      this._onSuperheroesChange.next(this._heroes);

      response.next({
        status: HttpStatusCode.Ok,
        message: 'Superhéroe eliminado correctamente',
        data: deletedHero
      });
    }, 1000);

    return response.asObservable();
  };

}
