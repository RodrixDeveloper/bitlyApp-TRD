import { Component, OnInit } from '@angular/core';
import { ShortUrlService } from 'src/app/services/short-url.service';

@Component({
  selector: 'app-short-url',
  templateUrl: './short-url.component.html',
  styleUrls: ['./short-url.component.css'],
})
export class ShortUrlComponent implements OnInit {
  nombreUrl: string = '';
  urlShort: string = '';
  urlProcesada: boolean = false;
  loading: boolean = false;
  mostrarError: boolean = false;
  textError: string = '';
  constructor(private _shoreUrlService: ShortUrlService) {}
  ngOnInit(): void {}

  procesarUrl() {
    //Validar si la URL esta vacio ''
    if (this.nombreUrl === '') {
      this.error('Por favor ingrese una URL');
    }
    this.urlProcesada = false;
    this.loading = true;
    setTimeout(() => {
      this.obtenerUrlShort();
    }, 2000);
  }

  obtenerUrlShort() {
    this._shoreUrlService.getUrlShort(this.nombreUrl).subscribe(
      (data) => {
        console.log(data);
        this.loading = false;
        this.urlProcesada = true;
        this.urlShort = data.link;
        this;
      },
      (error) => {
        console.log(error.error.description);
        this.loading = false;
        if (error.error.description == 'The value provided is invalid.') {
          this.error('La URL ingresada es invalida.');
          this.nombreUrl = '';
        }
      }
    );
  }

  error(valor: string) {
    this.mostrarError = true;
    this.textError = valor;
    this.urlShort = '';
    //Mostramos error por  4 segundos
    setTimeout(() => {
      this.mostrarError = false;
    }, 4000);
    return; //return para que no siga el codigo
  }
}
