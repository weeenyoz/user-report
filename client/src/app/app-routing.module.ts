import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginSignupComponent } from './auth/login-signup.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginSignupComponent,
    },
    {
        path: 'signup',
        component: LoginSignupComponent,
    },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard],
})
export class AppRoutingModule {}
