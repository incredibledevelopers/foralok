import { Routes, RouterModule } from '@angular/router';
import { ConceptComponent } from '../ipenapp/concept/concept.component';
import { ConceptlogsComponent } from '../ipenapp/conceptlogs/conceptlogs.component';
import { LogoutComponent } from './logout/logout.component';
import { CompaniesComponent } from './companies/companies.component';
import { TestComponent } from './test/test.component';

const childRoutes: Routes = [
    {
        path: 'concept',
        component: ConceptComponent,
        children : [
            { path: 'conceptlogs', component: ConceptlogsComponent },
        ]
    },
    {
        path: 'logout',
        component: LogoutComponent
    },
    {
        path: 'companies',
        component: CompaniesComponent
    },
    {
        path: 'test',
        component: TestComponent
    },
    
];

export const routing = RouterModule.forChild(childRoutes);
