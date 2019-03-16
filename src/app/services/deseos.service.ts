import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas: Lista[]=[];

  constructor() {

      const lista1 = new Lista('Titulo 1');
      const lista2 = new Lista('Titulo 2');

      this.listas.push(lista1, lista2);

  }

  crearLista( titulo: string ){
      const nuevalista = new Lista(titulo);

      this.listas.push(nuevalista);
  }
}
