import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'wOqfdOOJv6wH2MEKQEntSoUkTbJ0CQX6';

  private _historial: string[] = [];

  // TODO Cambiar any por su tipo correspondiente
  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {}

  buscarGifs(query: string = '') {
    query = query.trim().toLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.slice(0, 10);
    }
    this.http
      .get<SearchGifsResponse>(
        `https://api.giphy.com/v1/gifs/search?api_key=wOqfdOOJv6wH2MEKQEntSoUkTbJ0CQX6&q=${query}&limit=10`
      )
      .subscribe((resp) => {
        console.log(resp.data);
        this.resultados = resp.data;
      });
  }
}
