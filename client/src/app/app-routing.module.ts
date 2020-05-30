import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginSignupComponent } from './auth/login-signup.component';

const routes: Routes = [
    { path: 'login', component: LoginSignupComponent },
    { path: 'signup', component: LoginSignupComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
