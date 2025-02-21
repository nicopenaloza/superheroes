import { Observable } from "rxjs";
import { IServerResponse } from "./server-response.interface";

export interface ISuperhero {
    id: number;
    name: string;
    power: string;
    photo: string;
}

export interface IPreSaveSuperhero {
    name: string;
    power: string;
    photo: string;
}

export interface ISuperheroService {
    getSuperheroes(): Observable<ISuperhero[]>;
    getSuperheroById(id: number): Observable<ISuperhero | null>;
    addSuperhero(superhero: ISuperhero): Observable<IServerResponse<ISuperhero>>;
    updateSuperhero(superhero: ISuperhero): Observable<IServerResponse<ISuperhero>>;
    deleteSuperhero(id: number): Observable<IServerResponse<ISuperhero>>;
}