// Angular
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// Material
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';
// Translate
import { TranslateModule } from '@ngx-translate/core';
// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// CRUD
import { InterceptService } from '../../../core/_base/crud/';
// Module components
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthNoticeComponent } from './auth-notice/auth-notice.component';
// Auth
import { AuthEffects, AuthGuard, authReducer, AuthService } from '../../../core/auth';
import { Title } from '@angular/platform-browser';
import { NgxCaptchaModule } from 'ngx-captcha';
import { OTPDialogueComponent } from './OTPDialogBox/OTPDialogue.component';
import {MatIconModule} from '@angular/material';
const routes: Routes = [
	{
		path: '',
		component: AuthComponent,
		children: [
			{
				path: '',
				redirectTo: 'login',
				pathMatch: 'full'
			},
			{
				path: 'login',
				component: LoginComponent,
				data: {returnUrl: window.location.pathname,title: 'Signin'},
				
			},
			{
				path: 'register',
				component: RegisterComponent,
				data: { title: 'Signup' }
			},
			{
				path: 'forgot-password',
				component: ForgotPasswordComponent,
				data: { title: 'Forgot Password' }
			}
		]
	}
];


@NgModule({
	imports: [
	MatIconModule,
		CommonModule,
		NgxCaptchaModule,
		FormsModule,
		ReactiveFormsModule,
		MatButtonModule,
		RouterModule.forChild(routes),
		MatInputModule,
		MatFormFieldModule,
		MatCheckboxModule,
		TranslateModule.forChild(),
		StoreModule.forFeature('auth', authReducer),
		EffectsModule.forFeature([AuthEffects])
	],
	providers: [
		Title,
		InterceptService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: InterceptService,
			multi: true
		},
	],
	entryComponents:[OTPDialogueComponent],
	exports: [AuthComponent],
	declarations: [
		AuthComponent,
		LoginComponent,
		RegisterComponent,
		ForgotPasswordComponent,
		AuthNoticeComponent,
		OTPDialogueComponent
	]
})

export class AuthModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: AuthModule,
			providers: [
				AuthService,
				AuthGuard
			]
		};
	}
}
