import { Component, ViewChild, ViewContainerRef, OnInit, ComponentRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CharacterService } from '../../services/character.service';
import { from } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { CharacterCardComponent } from '../character-card/character-card.component';

interface Character {
  id: number;
  name: string;
  species: string;
  status: string;
  image: string;
  type: string;
  gender: string;
}


@Component({
  selector: 'app-dynamic-character-loader',
  templateUrl: './dynamic-character-loader.component.html',
  styleUrls: ['./dynamic-character-loader.component.css']
})
export class DynamicCharacterLoaderComponent {

  @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;
  isLoading = false;
  searchForm: FormGroup;

  constructor(private fb: FormBuilder, private characterService: CharacterService) {

    this.searchForm = this.fb.group({
      name: [''],
      species: [''],
      status: [''],
      type: [''],
      gender: ['']
    });

   }

  ngOnInit() {
    // No need
  }

  loadCharacters() : void {
    this.isLoading = true;
    this.container.clear();
    this.characterService.getCharacters().pipe(
      mergeMap(data => from((data as { results: Character[] }).results)),
      tap(() => this.isLoading = true)
    ).subscribe({
      next: (character: Character) => {
        const componentRef: ComponentRef<CharacterCardComponent> = this.container.createComponent(CharacterCardComponent);
        componentRef.instance.character = character;
        componentRef.location.nativeElement.classList.add('col-md-4', 'mb-4');
      },
      error: (err: any) => {
        console.error('Error al cargar los personajes:', err);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  searchCharacters() : void {
    this.isLoading = true;
    this.container.clear();
    console.log(this.searchForm.value);
    const filters = this.searchForm.value;
    this.characterService.filterCharacters(filters).pipe(
      mergeMap(data => from((data as { results: Character[] }).results)),
      tap(() => this.isLoading = true)
    ).subscribe({
      next: (character: Character) => {
        const componentRef: ComponentRef<CharacterCardComponent> = this.container.createComponent(CharacterCardComponent);
        componentRef.instance.character = character;
        componentRef.location.nativeElement.classList.add('col-md-4', 'mb-4');
      },
      error: (err: any) => {
        console.error('Error al cargar los personajes:', err);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }



}
