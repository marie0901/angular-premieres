import * as moment from "moment";

export class PremiereItem {
  id: string;
  title: string;
  posterUrl: string;
  releaseDate: any;
  isFavorite: boolean;

  constructor(obj?: any) {
    const imagePrefix: string = "https://image.tmdb.org/t/p/w500"; //chould be constant moved to configuration

    this.id = (obj && obj.id) || null;
    this.title = (obj && obj.title) || null;
    this.releaseDate =
      obj && obj.releaseDate
        ? moment(new Date(obj.releaseDate)).format("MM/DD/YYYY")
        : null;
    this.isFavorite = (obj && obj.isFavorite) || false;
    if (obj && obj.posterUrl) {
      let searchPattern = new RegExp("^http");
      if (searchPattern.test(obj.posterUrl)) {
        this.posterUrl = obj.posterUrl;
      } else {
        this.posterUrl = imagePrefix + obj.posterUrl;
      }
    } else {
      this.posterUrl = null;
    }
  }
}
