import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private servicioUrl = 'https://api.giphy.com/v1/gifs';
  private _apiKey: string = 'qkk6dEDrbIab5H7gwtH9HqtmzWWTtCYC';
  private _historial: string[] = [];
  public resultados : Gif[] = [];

  constructor(private http: HttpClient){

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

  }

  get historial() : string[]{
    return [...this._historial];
  }

  buscarGifs(query: string){

    if(query.length === 0){
      return;
    }    

    query = query.trim().toLocaleLowerCase();
    if(!this.historial.includes(query)){
      this._historial.unshift(query);  
      this.historial.splice(0,10);
      localStorage.setItem('historial', JSON.stringify(this.historial) );
    }

    const params = new HttpParams().
        set("key", this._apiKey).
        set("q", query).
        set("limit", "10");

    // INTERPOLACION DE STRINGS: ` 
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params}).
            subscribe((resp : SearchGifsResponse) => {
              console.log(resp.data);
              this.resultados = resp.data;
              localStorage.setItem('resultados', JSON.stringify(this.resultados) );
            });

    /* PROMESAS CON JS
    fetch('https://api.giphy.com/v1/gifs/search?key=qkk6dEDrbIab5H7gwtH9HqtmzWWTtCYC&q=dbz&limit=10').
      then(resp => { resp.json().then(data => {
          console.log(data);
        }) 
      })
    */
  }
}
