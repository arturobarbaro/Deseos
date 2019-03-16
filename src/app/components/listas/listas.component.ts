import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Lista } from 'src/app/models/lista.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @Input() terminada=true;
  @ViewChild( IonList ) lista = IonList;
  constructor( public deseosService: DeseosService,
               private router: Router,
               private alertCtrl: AlertController
           ) { }

  ngOnInit() {}

  listaSeleccionada(lista: Lista){
      this.terminada?this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`):this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
  }

  borrarLista(lista: Lista){
      this.deseosService.borrarLista(lista);
  }

  async editarLista(lista: Lista){

          const alert = await this.alertCtrl.create({
              header: 'Editar lista',
              inputs: [
                  {
                      name: 'titulo',
                      type: 'text',
                      value: lista.titulo,
                      placeholder: 'Nombre de la lista'
                  }
              ],
              buttons: [
                  {
                      text: 'Cancelar',
                      role: 'cancel',
                      handler: ()=>{
                          this.lista.closeSlidingItems();
                      }
                  },
                  {
                      text: 'Editar',
                      handler: (data)=>{
                          if(data.titulo.length>0) {
                              lista.titulo = data.titulo;
                              this.deseosService.guardarStorage();
                          }
                          this.lista.closeSlidingItems();
                      }
                  }
              ]
          });

          alert.present();
  }

}
