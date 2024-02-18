  import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Maestro } from '../maestro/maestro';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { InicioService } from './inicio.service';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  mostrar : boolean = true;
  inicio : any ;
  role   : string = '';
  id_usuario : any;
  lstMenu : any = [];
  permisos_usuario : any;
  colorimetria : any;
  toolbar : any = "";
  menu    : string = "";
  token : string = "";

  constructor(private readonly route: Router,
              private observer: BreakpointObserver, 
              private readonly inicioService : InicioService,
              private activatedRoute: ActivatedRoute
              ){
    this.inicio = new Maestro(route);
  }
  ngOnInit(): void {

    this.observer.observe(["(max-width: 800px)"]).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = "over";
        this.sidenav.close();
      } else {
        this.sidenav.mode = "side";
        this.sidenav.open();
      }
    });
    
    var urlServicio         = this.route.url;
    var arrayDeCadenas = urlServicio.split("/");
    this.id_usuario = arrayDeCadenas[2];
    this.role = arrayDeCadenas[3];

    // consultar parametros usuario y permisos
    console.log(this.id_usuario)
    this.permisos_usuario = {}

    this.inicioService.getCredencialesPermisos({user : this.id_usuario,role : this.role, token : arrayDeCadenas[4]}).subscribe(res => {
      console.log(arrayDeCadenas[4])
      if ( res != null ){
      this.lstMenu = res.menu
      this.token = arrayDeCadenas[4];
      this.route.navigate(["./resumen"], { relativeTo: this.activatedRoute })
      }else{
        
      }
      
    })
    

    


  }

  ngAfterViewInit() {

    this.observer.observe(["(max-width: 800px)"]).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = "over";
        this.sidenav.close();
      } else {
        this.sidenav.mode = "side";
        this.sidenav.open();
      }
    });
  }

 

}
