import { Component, OnInit, Input } from "@angular/core";
import { PremiereItem } from "./premiere-item.model";
import { PremiereSearchService } from "./premiere-search.service";

@Component({
  selector: "app-premiere-item",
  templateUrl: "./premiere-item.component.html"
})
export class PremiereItemComponent implements OnInit {
  @Input() premiereItem: PremiereItem;

  constructor(private premiereService: PremiereSearchService) {}

  ngOnInit() {}

  toggleFavorite() {
    this.premiereItem.isFavorite = !this.premiereItem.isFavorite;
    this.premiereService.toggleFavorite(this.premiereItem);
  }
}
