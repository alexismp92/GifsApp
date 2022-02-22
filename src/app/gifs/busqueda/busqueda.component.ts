import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../service/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar! : ElementRef<HTMLInputElement>; //! NON NULL ASSERTION OPERATOR

  constructor(private gifsService: GifsService){}


  buscar(){
    
    this.gifsService.buscarGifs(this.txtBuscar.nativeElement.value);
    this.txtBuscar.nativeElement.value = '';
  }

}
