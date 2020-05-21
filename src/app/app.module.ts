import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { SidebarService } from '../app/components/sidebar/sidebar.service';
import { HttpModule } from '@angular/http';
import { DashboardService } from './pages/dashboard/dashboard.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    HttpModule,
    ToastrModule.forRoot()
  ],
  declarations: [ AppComponent, AdminLayoutComponent, AuthLayoutComponent],
  providers: [ DashboardService,SidebarService],
  bootstrap: [AppComponent]
})
export class AppModule {}
