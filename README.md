# Angular 16 JWT Authentication & Authorization example with Rest API

Build Angular 16 JWT Authentication & Authorization example with Rest Api, HttpOnly Cookie and JWT (including HttpInterceptor, Router & Form Validation).
- JWT Authentication Flow for User Registration (Signup) & User Login
- Project Structure with HttpInterceptor, Router
- Way to implement HttpInterceptor
- How to store JWT token in HttpOnly Cookie
- Creating Login, Signup Components with Form Validation
- Angular Components for accessing protected Resources
- How to add a dynamic Navigation Bar to Angular App
- Working with Browser Session Storage

## Flow for User Registration and User Login
For JWT – Token based Authentication with Rest API, we’re gonna call 2 endpoints:
- POST `api/auth/signup` for User Registration
- POST `api/auth/signin` for User Login
- POST `api/auth/signout` for User Logout

You can take a look at following flow to have an overview of Requests and Responses that Angular 16 JWT Authentication & Authorization Client will make or receive.

```mermaid
graph LR
    A[User] -->|Signup Request| B[API: /api/auth/signup]
    B -->|Signup Response| A
    A -->|Login Request| C[API: /api/auth/signin]
    C -->|Login Response with JWT| A
    A -->|Access Protected Resource| D[API: /api/test/user]
    D -->|Response with Data| A
    A -->|Logout Request| E[API: /api/auth/signout]
    E -->|Logout Response| A
```

## Angular JWT App Diagram with Router and HttpInterceptor
![angular-16-jwt-authentication](angular-16-jwt-authentication.png)

```mermaid
graph LR
    A[App Module] -->|Imports| B[Auth Module]
    A -->|Imports| C[Home Module]
    A -->|Imports| D[Profile Module]
    A -->|Imports| E[Board Admin Module]
    A -->|Imports| F[Board Moderator Module]
    A -->|Imports| G[Board User Module]
    B -->|Component| H[Login Component]
    B -->|Component| I[Register Component]
    B -->|Service| J[Auth Service]
    B -->|Guard| K[Auth Guard]
    J -->|Uses| L[HttpClient]
    M[HttpInterceptor] -->|Intercepts| N[HTTP Requests]
    N -->|Sends| O[HTTP Responses]
```

## Execute script to init

ng generate module modules/characters --route characters --module app-routing.module
ng generate service modules/characters/services/character
ng generate component modules/characters/components/character-card
ng generate component modules/characters/components/dynamic-character-loader


Run `ng serve --port 8081` for a dev server. Navigate to `http://localhost:8081/`.


🚀 Implementación de Dynamic Component Loader con Lazy Loading en Angular para la API de Rick and Morty
Vamos a crear un módulo independiente (characters.module.ts) que se cargará de manera Lazy Loading y permitirá cargar personajes de la API de Rick and Morty dinámicamente con Dynamic Component Loader.

📌 Pasos a Seguir
1️⃣ Crear el módulo characters con Lazy Loading
2️⃣ Crear un servicio character.service.ts para consumir la API de Rick and Morty
3️⃣ Implementar un DynamicComponentLoader para cargar los personajes
4️⃣ Configurar rutas para Lazy Loading
5️⃣ Probar la carga dinámica de personajes

1️⃣ Crear el Módulo characters con Lazy Loading
Ejecuta el siguiente comando en tu terminal:

bash
Copiar
Editar
ng generate module modules/characters --route characters --module app-routing.module
Este comando crea automáticamente:

modules/characters/characters.module.ts
Configura app-routing.module.ts para cargar el módulo dinámicamente.
📌 characters.module.ts
typescript
Copiar
Editar
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersComponent } from './characters.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: CharactersComponent }];

@NgModule({
  declarations: [CharactersComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class CharactersModule {}
2️⃣ Crear el Servicio para Consumir la API de Rick and Morty
Ejecuta el siguiente comando:

bash
Copiar
Editar
ng generate service modules/characters/services/character
📌 character.service.ts
typescript
Copiar
Editar
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private API_URL = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  getCharacters(): Observable<any> {
    return this.http.get(this.API_URL);
  }
}
3️⃣ Implementar DynamicComponentLoader para Cargar los Personajes
📌 Crear el CharacterCardComponent para representar un personaje
Ejecuta:

bash
Copiar
Editar
ng generate component modules/characters/components/character-card
📌 character-card.component.ts
typescript
Copiar
Editar
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-character-card',
  template: `
    <div class="card">
      <img [src]="character.image" alt="{{ character.name }}">
      <h3>{{ character.name }}</h3>
      <p>Status: {{ character.status }}</p>
      <p>Species: {{ character.species }}</p>
    </div>
  `,
  styles: [`
    .card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 10px;
      text-align: center;
      max-width: 200px;
      margin: 10px;
    }
    img {
      width: 100%;
      border-radius: 8px;
    }
  `]
})
export class CharacterCardComponent {
  @Input() character: any;
}
📌 Implementar el DynamicComponentLoader
Ejecuta:

bash
Copiar
Editar
ng generate component modules/characters/components/dynamic-character-loader
📌 dynamic-character-loader.component.ts
typescript
Copiar
Editar
import { Component, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { CharacterCardComponent } from '../character-card/character-card.component';

@Component({
  selector: 'app-dynamic-character-loader',
  template: `
    <button (click)="loadCharacters()">Cargar Personajes</button>
    <div #container class="grid-container"></div>
  `,
  styles: [`
    .grid-container {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
  `]
})
export class DynamicCharacterLoaderComponent {
  @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;

  constructor(private characterService: CharacterService) {}

  loadCharacters() {
    this.container.clear();
    this.characterService.getCharacters().subscribe(data => {
      data.results.forEach(character => {
        const componentRef: ComponentRef<CharacterCardComponent> = this.container.createComponent(CharacterCardComponent);
        componentRef.instance.character = character;
      });
    });
  }
}
4️⃣ Configurar la Ruta para Lazy Loading
Verifica que app-routing.module.ts contenga lo siguiente:

typescript
Copiar
Editar
const routes: Routes = [
  { path: 'characters', loadChildren: () => import('./modules/characters/characters.module').then(m => m.CharactersModule) },
  { path: '**', redirectTo: '' }
];
5️⃣ Probar la Carga Dinámica de Personajes
Edita characters.component.html para usar el cargador dinámico:

html
Copiar
Editar
<h2>Lista de Personajes de Rick and Morty</h2>
<app-dynamic-character-loader></app-dynamic-character-loader>
✅ Resultado Esperado
1️⃣ Cuando el usuario visita /characters, el módulo se carga dinámicamente gracias a Lazy Loading.
2️⃣ Al hacer clic en "Cargar Personajes", la API de Rick and Morty responde con datos y se generan componentes dinámicos en el DOM para cada personaje.
3️⃣ Cada personaje se muestra en una tarjeta independiente sin necesidad de definir manualmente cada componente en la plantilla.

🔥 Beneficios de Este Enfoque
✅ Lazy Loading: Reduce el tamaño del bundle inicial.
✅ Componentes Dinámicos: Permite cargar datos sin definir manualmente cada componente.
✅ Escalabilidad: Se pueden agregar más APIs y componentes sin modificar la estructura principal.