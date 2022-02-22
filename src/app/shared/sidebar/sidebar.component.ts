import { Component } from '@angular/core';
import { GifsService } from '../../gifs/service/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  constructor(private gifsService: GifsService) { }

  get historial(): string[]{
    return this.gifsService.historial;
  }

  buscar(query: string){
      console.log(query);
      this.gifsService.buscarGifs(query);
  }

}
