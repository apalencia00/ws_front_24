import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { InicioService } from './inicio.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    isActive: boolean;
    collapsed: boolean;
    showMenu: string;
    pushRightClass: string;
    lstMenu : any = [];
    
  mostrar : boolean = true;
  inicio : any ;
  role   : string = '';
  id_usuario : any;
  permisos_usuario : any;
  colorimetria : any;
  toolbar : any = "";
  menu    : string = "";
  token : string = "";
    @Output() collapsedEvent = new EventEmitter<boolean>();

    constructor(
        private translate: TranslateService, 
        public router: Router, 
        private readonly inicioService : InicioService,
        private activatedRoute: ActivatedRoute) {
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        var urlServicio         = this.router.url;
        var arrayDeCadenas = urlServicio.split("/");
        this.id_usuario = arrayDeCadenas[2];
        this.role = arrayDeCadenas[3];
        this.isActive = false;
        this.collapsed = false;
        this.showMenu = '';
        this.pushRightClass = 'push-right';

        this.inicioService.getCredencialesPermisos({user : this.id_usuario,role : this.role, token : arrayDeCadenas[4]}).subscribe(res => {
            console.log(arrayDeCadenas[4])
            if ( res != null ){
            this.lstMenu = res.menu
            this.token = arrayDeCadenas[4];
            this.router.navigate(["./resumen"], { relativeTo: this.activatedRoute })
            }else{
              
            }
            
          })
    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }
}
