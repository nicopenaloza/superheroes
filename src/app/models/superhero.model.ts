import { ISuperhero } from "../interfaces/superheroes.interface";

export class SuperHero implements ISuperhero {
    id: number;
    name: string;
    power: string;
    photo: string;
    
    constructor(id: number, name: string, power: string, photo: string) {
        this.id = id;
        this.name = name;
        this.power = power;
        this.photo = photo;
    }
}