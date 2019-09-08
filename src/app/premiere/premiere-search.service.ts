import { Injectable, Inject } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable, BehaviorSubject, ReplaySubject } from "rxjs";
import { PremiereItem } from "./premiere-item.model";
import "rxjs/add/operator/map";
import { scan } from "rxjs/operators";

@Injectable()
export class PremiereSearchService {
  private storageSubject = new BehaviorSubject<number>(localStorage.length);
  private favoritesSubject = new BehaviorSubject<PremiereItem[]>([]);
  private premieresSubject = new BehaviorSubject<PremiereItem[]>([]);
  premieresObs = this.premieresSubject.asObservable();

  constructor(private http: Http) {}

  search(page: number): void {
    /*
      This should be 2 constants API_URL and API_KEY exported and then injected when the app become more complicated
      But I put it here now for a simplicity sake
      */
    const apiUrl: string =
      "https://api.themoviedb.org/3/movie/upcoming?api_key=bbe5212cbef800a2cfe2bb580a80fbdd";
    let query: string = `${apiUrl}&page=${page}`;
    this.http
      .get(query)
      .map((response: Response) => {
        return (<any>response.json()).results.map(item => {
          let isFavorite: boolean = this.isFavorite(item.id);
          return new PremiereItem({
            id: item.id,
            title: item.title,
            posterUrl: item.poster_path,
            releaseDate: item.release_date,
            isFavorite: isFavorite
          });
        });
      })
      .subscribe(premieres => {
        this.premieresSubject.next(
          this.premieresSubject.getValue().concat(premieres)
        );
      });
  }

  isFavorite(premiereId: string): boolean {
    if (localStorage.getItem(premiereId) === null) {
      return false;
    } else {
      return true;
    }
  }

  toggleFavorite(premiereItem: PremiereItem): void {
    if (this.isFavorite(premiereItem.id)) {
      localStorage.removeItem(premiereItem.id);
      this.storageSubject.next(localStorage.length);
      this.favoritesSubject.next(this._getFavorites());
      this._updatePremiereItem(premiereItem.id, false);
    } else {
      localStorage.setItem(premiereItem.id, JSON.stringify(premiereItem));
      this.storageSubject.next(localStorage.length);
      this.favoritesSubject.next(this._getFavorites());
      this._updatePremiereItem(premiereItem.id, true);
    }
  }

  _updatePremiereItem(id: string, isFavorite: boolean): void {
    const premieres: PremiereItem[] = this.premieresSubject.getValue();
    const index = premieres.findIndex(item => item.id === id);
    const newPremieres: PremiereItem[] = premieres.slice(0);
    newPremieres[index] = {
      ...newPremieres[index],
      isFavorite
    };

    this.premieresSubject.next(newPremieres);
  }

  _getFavorites(): PremiereItem[] {
    return Object.values(localStorage).map(item => {
      return new PremiereItem(JSON.parse(item));
    });
  }

  getFavorites(): Observable<PremiereItem[]> {
    this.favoritesSubject.next(this._getFavorites());
    return this.favoritesSubject.asObservable();
  }

  watchStorage(): Observable<any> {
    //use to subscribe on the localStorage changes in components
    return this.storageSubject.asObservable();
  }
}
