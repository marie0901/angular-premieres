import { Component, OnInit } from "@angular/core";
import { PremiereItem } from "./premiere-item.model";
import { PremiereSearchService } from "./premiere-search.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-premiere-search",
  templateUrl: "./premiere-search.component.html"
})
export class PremiereSearchComponent implements OnInit {
  currentPage: number = 1;
  premieresObs: Observable<PremiereItem[]> = this.premiereService.premieresObs;

  constructor(private premiereService: PremiereSearchService) {}

  ngOnInit(): void {
    this.premiereService.search(this.currentPage);
  }
  searchNextPage() {
    this.currentPage++;
    this.premiereService.search(this.currentPage);
  }
}
