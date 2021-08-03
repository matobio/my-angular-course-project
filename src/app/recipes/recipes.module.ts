import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { RecipesComponent } from './recipes.component';
import { RecipesEditComponent } from './recipes-edit/recipes-edit.component';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';
import { RecipesStartComponent } from './recipes-start/recipes-start.component';
import { RecipesItemComponent } from './recipes-list/recipes-item/recipes-item.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipesListComponent,
    RecipesItemComponent,
    RecipesStartComponent,
    RecipesDetailComponent,
    RecipesEditComponent,
  ],
  imports: [RouterModule, ReactiveFormsModule, SharedModule],
})
export class RecipesModule {}
