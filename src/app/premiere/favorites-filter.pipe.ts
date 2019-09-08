import { PipeTransform, Pipe } from "@angular/core";
import { PremiereItem } from "./premiere-item.model";
import * as moment from "moment";

@Pipe({
  name: "favoritesFilter"
})
export class FavoritesFilterPipe implements PipeTransform {
  transform(
    favorites: PremiereItem[],
    searchTitle: string,
    searchDate: string
  ): PremiereItem[] {
    if (!favorites) {
      return favorites;
    }
    if (!searchTitle && !searchDate) {
      return favorites;
    }

    return favorites.filter(fav => {
      return (
        (!searchTitle ||
          fav.title.toLowerCase().indexOf(searchTitle.toLowerCase()) !== -1) &&
        (!searchDate ||
          moment(moment(fav.releaseDate, "MM/DD/YYYY")).isSameOrAfter(
            moment(searchDate, "MM/DD/YYYY")
          ))
      );
    });
  }
}
