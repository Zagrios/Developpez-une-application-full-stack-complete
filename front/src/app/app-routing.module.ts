import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPortalComponent } from './pages/auth-portal/portal/auth-portal.component';
import { LoginComponent } from './pages/auth-portal/login/login.component';
import { RegisterComponent } from './pages/auth-portal/register/register.component';
import { HomeComponent } from './pages/home/home/home.component';
import { TopicsListComponent } from './pages/home/views/topics-list/topics-list.component';
import { PostsListComponent } from './pages/home/views/posts-list/posts-list.component';
import { UserProfileComponent } from './pages/home/views/user-profile/user-profile.component';
import { LoggedGuard } from './guards/logged.guard';
import { NotLoggedGuard } from './guards/not-logged.guard';
import { CreatePostComponent } from './pages/home/views/new-post/create-post.component';
import { PostViewComponent } from './pages/home/views/post-view/post-view.component';

// consider a guard combined with canLoad / canActivate route option
// to manage unauthenticated user to access private routes
const routes: Routes = [
  { path: '', component: AuthPortalComponent, canActivate: [NotLoggedGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NotLoggedGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [NotLoggedGuard] },
  { path: 'home', component: HomeComponent, canActivate: [LoggedGuard], children: [
    { path: '', redirectTo: 'posts', pathMatch: 'full' },
    { path: 'topics', component: TopicsListComponent },
    { path: 'posts', component: PostsListComponent },
    { path: 'posts/:id', component: PostViewComponent },
    { path: 'new-post', component: CreatePostComponent },
    { path: 'me', component: UserProfileComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
