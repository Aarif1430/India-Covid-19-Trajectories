import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule, FormsModule, Ng2SearchPipeModule],
  declarations: [SidebarComponent],
  exports: [SidebarComponent]
})
export class ComponentsModule {}
