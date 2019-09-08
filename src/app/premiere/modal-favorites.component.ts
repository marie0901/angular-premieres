import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { PremiereItem } from "./premiere-item.model";
import { PremiereSearchService } from "./premiere-search.service";
import { Observable } from "rxjs/Observable";
import { FavoritesFilterPipe } from "./favorites-filter.pipe";

@Component({
  selector: "app-modal-favorites",
  templateUrl: "./modal-favorites.component.html"
})
export class ModalFavoritesComponent implements OnInit {
  favorites: Observable<PremiereItem[]>;

  constructor(
    private dialogRef: MatDialogRef<ModalFavoritesComponent>,
    private premiereService: PremiereSearchService
  ) {}

  ngOnInit() {
    this.favorites = this.premiereService.getFavorites();
    console.log("!!!!this.favorites", this.favorites);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
