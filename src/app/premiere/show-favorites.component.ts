import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ElementRef
} from "@angular/core";

import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/do";
import "rxjs/add/operator/switch";

import { PremiereSearchService } from "./premiere-search.service";
import { PremiereItem } from "./premiere-item.model";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ModalFavoritesComponent } from "./modal-favorites.component";

@Component({
  selector: "app-show-favorites",
  template: `<button mat-button type="button" (click)="openDialog()">
    Favorites ({{ favoritesCount | async }})
  </button>`
})
export class ShowFavoritesComponent implements OnInit {
  constructor(
    private premiereService: PremiereSearchService,
    private dialog: MatDialog
  ) {}

  favoritesCount = this.premiereService.watchStorage();

  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalFavoritesComponent, {
      width: "700px",
      height: "900px"
    });
  }
}
