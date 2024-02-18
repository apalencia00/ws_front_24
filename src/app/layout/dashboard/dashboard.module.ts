import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbAlertModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { PageHeaderModule, StatModule } from '../../shared';
import { ChatComponent, NotificationComponent, TimelineComponent } from './components';
import { NgChartsModule  as Ng2Charts } from 'ng2-charts';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ChartsRoutingModule } from '../charts/charts-routing.module';
import { ChartsComponent } from '../charts/charts.component';

@NgModule({
    imports: [CommonModule, NgbCarouselModule, NgbAlertModule, DashboardRoutingModule, StatModule, PageHeaderModule,ChartsRoutingModule,Ng2Charts],
    declarations: [DashboardComponent, TimelineComponent, NotificationComponent, ChatComponent,ChartsComponent]
})
export class DashboardModule {}
