import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginSignupComponent } from './auth/login-signup.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
    { path: 'login', component: LoginSignupComponent },
    { path: 'signup', component: LoginSignupComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    {
        path: 'reports/new',
        component: ReportComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'reports/:id',
        component: ReportComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard],
})
export class AppRoutingModule {}
