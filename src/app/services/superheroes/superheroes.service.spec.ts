import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpStatusCode } from '@angular/common/http';
import { SuperHeroesService } from './superheroes.service';
import { IPreSaveSuperhero, ISuperhero } from '../../interfaces/superheroes.interface';
import { IServerResponse } from '../../interfaces/server-response.interface';

describe('SuperHeroesService', () => {
  let service: SuperHeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperHeroesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getSuperheroes should return an empty array initially', fakeAsync(() => {
    let heroes: ISuperhero[] = [];
    service.getSuperheroes().subscribe(data => heroes = data);
    tick(1000);
    expect(heroes).toEqual([]);
  }));

  it('addSuperhero should add a superhero and emit change', fakeAsync(() => {
    let addResponse: IServerResponse<ISuperhero> | undefined;
    const newHero: IPreSaveSuperhero = { name: 'Batman', power: 'Inteligencia' } as IPreSaveSuperhero;
    service.addSuperhero(newHero).subscribe(res => addResponse = res);
    tick(1000);
    
    expect(addResponse).toBeDefined();
    expect(addResponse!.status).toEqual(HttpStatusCode.Ok);
    expect(addResponse!.data.name).toEqual('Batman');
    expect(addResponse!.data.id).toEqual(0);

    // Verificamos que se actualizó el BehaviorSubject
    let emittedHeroes: ISuperhero[] = [];
    service.onSuperheroesChange.subscribe(heroes => emittedHeroes = heroes);
    expect(emittedHeroes.length).toEqual(1);
    expect(emittedHeroes[0].name).toEqual('Batman');
  }));

  it('updateSuperhero should update an existing superhero', fakeAsync(() => {
    let addResponse: IServerResponse<ISuperhero> | undefined;
    const newHero: IPreSaveSuperhero = { name: 'Superman', power: 'Fuerza' } as IPreSaveSuperhero;
    service.addSuperhero(newHero).subscribe(res => addResponse = res);
    tick(1000);

    // Actualizamos el superhéroe agregado
    const heroToUpdate: ISuperhero = { ...addResponse!.data, power: 'Vuelo' };
    let updateResponse: IServerResponse<ISuperhero> | undefined;
    service.updateSuperhero(heroToUpdate).subscribe(res => updateResponse = res);
    tick(1000);

    expect(updateResponse).toBeDefined();
    expect(updateResponse!.data.power).toEqual('Vuelo');

    // Verificamos que se actualice al obtenerlo por ID
    let fetchedHero: ISuperhero | null = null;
    service.getSuperheroById(heroToUpdate.id).subscribe(data => fetchedHero = data);
    tick(1000);
    expect(fetchedHero).toBeTruthy();
    expect(fetchedHero!.power).toEqual('Vuelo');
  }));

  it('deleteSuperhero should remove an existing superhero', fakeAsync(() => {
    let addResponse: IServerResponse<ISuperhero> | undefined;
    const newHero: IPreSaveSuperhero = { name: 'Wonder Woman', power: 'Agilidad' } as IPreSaveSuperhero;
    service.addSuperhero(newHero).subscribe(res => addResponse = res);
    tick(1000);

    const hero: ISuperhero = addResponse!.data;
    let deleteResponse: IServerResponse<ISuperhero> | undefined;
    service.deleteSuperhero(hero.id).subscribe(res => deleteResponse = res);
    tick(1000);

    expect(deleteResponse).toBeDefined();
    expect(deleteResponse!.data.id).toEqual(hero.id);

    // Al intentar obtener el héroe eliminado, debe retornar null.
    let fetchedHero: ISuperhero | null = {} as any;
    service.getSuperheroById(hero.id).subscribe(data => fetchedHero = data);
    tick(1000);
    expect(fetchedHero).toBeNull();
  }));

  it('deleteSuperhero should emit error when hero does not exist', fakeAsync(() => {
    let errorResponse: any;
    service.deleteSuperhero(999).subscribe({
      next: () => {},
      error: err => errorResponse = err
    });
    tick(1000);
    expect(errorResponse).toBeDefined();
    expect(errorResponse.status).toEqual(HttpStatusCode.NotFound);
  }));

  it('getSuperheroesByName should filter heroes correctly', fakeAsync(() => {
    // Agregamos varios héroes
    service.addSuperhero({ name: 'Spider-Man', power: 'Araña' } as IPreSaveSuperhero).subscribe();
    tick(1000);
    service.addSuperhero({ name: 'Iron Man', power: 'Tecnología' } as IPreSaveSuperhero).subscribe();
    tick(1000);
    service.addSuperhero({ name: 'Hulk', power: 'Fuerza' } as IPreSaveSuperhero).subscribe();
    tick(1000);

    let filteredHeroes: ISuperhero[] = [];
    service.getSuperheroesByName('man').subscribe(heroes => filteredHeroes = heroes);
    tick(1000);
    
    // Debe retornar Spider-Man e Iron Man (la búsqueda es case insensitive)
    expect(filteredHeroes.length).toEqual(2);
    expect(filteredHeroes.some(hero => hero.name === 'Spider-Man')).toBeTrue();
    expect(filteredHeroes.some(hero => hero.name === 'Iron Man')).toBeTrue();
  }));
});
