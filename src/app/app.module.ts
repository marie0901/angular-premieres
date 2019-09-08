import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material.module";

import { AppComponent } from "./app.component";
import { PremiereSearchComponent } from "./premiere/premiere-search.component";
import { PremiereItemComponent } from "./premiere/premiere-item.component";
import { ShowFavoritesComponent } from "./premiere/show-favorites.component";
import { ModalFavoritesComponent } from "./premiere/modal-favorites.component";
import { PremiereSearchService } from "./premiere/premiere-search.service";
import { FavoritesFilterPipe } from "./premiere/favorites-filter.pipe";

@NgModule({
  declarations: [
    AppComponent,
    PremiereSearchComponent,
    PremiereItemComponent,
    ShowFavoritesComponent,
    ModalFavoritesComponent,
    FavoritesFilterPipe
  ],
  imports: [BrowserModule, HttpModule, BrowserAnimationsModule, MaterialModule],
  providers: [PremiereSearchService],
  bootstrap: [AppComponent],
  entryComponents: [ModalFavoritesComponent]
})
export class AppModule {}
