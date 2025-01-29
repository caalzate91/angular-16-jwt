import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersComponent } from './characters.component';
import { CharacterCardComponent } from './components/character-card/character-card.component';
import { DynamicCharacterLoaderComponent } from './components/dynamic-character-loader/dynamic-character-loader.component';


@NgModule({
  declarations: [
    CharactersComponent,
    CharacterCardComponent,
    DynamicCharacterLoaderComponent
  ],
  imports: [
    CommonModule,
    CharactersRoutingModule, 
    ReactiveFormsModule
  ]
})
export class CharactersModule { }
