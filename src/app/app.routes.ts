import { Routes } from '@angular/router';

export enum PATHS {
    SUPERHEROES = 'superheroes'
}

export const routes: Routes = [
    {
        path: PATHS.SUPERHEROES,
        loadChildren: () => import('./pages/superheroes-page/superheroes-page.module').then(m => m.SuperheroesPageModule)
    },
    { path: '**', redirectTo: PATHS.SUPERHEROES }
];
