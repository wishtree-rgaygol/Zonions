// Angular
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// RxJS
import { Observable, Subject } from 'rxjs';
import { finalize, takeUntil, tap } from 'rxjs/operators';
// Translate
import { TranslateService } from '@ngx-translate/core';
// Store
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
// Auth
import { AuthNoticeService, AuthService, Login, User } from '../../../../core/auth';
import { TokenStorageService } from '../../../../core/auth/_services/token-storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OTPDialogueComponent } from '../OTPDialogBox/OTPDialogue.component';
import { Title } from '@angular/platform-browser';
import TitleName from '../../restaurants/_helpers/TitleName';
import { oauthService } from '/home/rgaygol/Documents/Zonions Project/Git hub Clone folder/Zonions/Zonions/Front End/src/app/core/auth/_services/oauth.service';
import { TokenClass } from '/home/rgaygol/Documents/Zonions Project/Git hub Clone folder/Zonions/Zonions/Front End/src/app/core/auth/_services/tokenClass';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

/**
 * ! Just example => Should be removed in development
 */
const DEMO_PARAMS = {
	EMAIL: 'demo@gmail.com',
	PASSWORD: 'demo'
};

const USER_ROLE = 'auth-role';

@Component({
	selector: 'kt-login',
	templateUrl: './login.component.html',
	encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {
	// Public params
	loginForm: FormGroup;
	loading = false;
	isLoggedIn$: Observable<boolean>;
	errors: any = [];
	isLoggedIn = false;
	roles: string[] = [];
	loginCount = 0;
	usernm: String;
	array: any;
	errorMessage: String;
	private unsubscribe: Subject<any>;
	captchaSuccess = false;
	private returnUrl: any;
	titleName: any = TitleName;
	socialUser: SocialUser;
	currentUser: any;
	invalidLogin = false;
	userLogged: SocialUser;
	isLogged: boolean;
	// Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

	/**
	 * Component constructor
	 *
	 * @param router: Router
	 * @param auth: AuthService
	 * @param authNoticeService: AuthNoticeService
	 * @param translate: TranslateService
	 * @param store: Store<AppState>
	 * @param fb: FormBuilder
	 * @param cdr
	 * @param route
	 */
	constructor(
		private authService: SocialAuthService,
		private oauthService: oauthService,
		private router: Router,
		private auth: AuthService,
		private authNoticeService: AuthNoticeService,
		private translate: TranslateService,
		private store: Store<AppState>,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		private route: ActivatedRoute,
		private title: Title,
		private tokenStorage: TokenStorageService,
		private modalservice: NgbModal,
	) {
		this.unsubscribe = new Subject();
	}
	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		// tslint:disable-next-line: prefer-for-of
		for (let i = 0; i < this.titleName.length; i++) {
			console.log(this.titleName[i].name);
			this.title.setTitle(this.titleName[i].name + '|Login');
		  }
		  // tslint:disable-next-line: align
		  this.authService.authState.subscribe(
			data => {
			  this.userLogged = data;
			  this.isLogged = (this.userLogged != null && this.tokenStorage.getToken() != null);
			}
		  );
		const token: string = this.route.snapshot.queryParamMap.get('token');
		const error: string = this.route.snapshot.queryParamMap.get('error');
	 if (this.tokenStorage.getToken()) {
		  this.isLoggedIn = true;
		  this.currentUser = this.tokenStorage.getUser();
	 } 
		this.initLoginForm();
		if (this.tokenStorage.getToken()) {
			this.isLoggedIn = true;
			this.roles = this.tokenStorage.getUser().roles;

		  }
		// redirect back to the returnUrl before login
		this.route.queryParams.subscribe(params => {
			this.returnUrl = params.returnUrl || '/restaurants/restHome';
		});
	}
	signInWithGoogle(): void {
		this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
		  data => {
			this.socialUser = data;
			const tokenGoogle = new TokenClass(this.socialUser.idToken);
			this.oauthService.google(tokenGoogle).subscribe(
			  res => {
				this.tokenStorage.setToken(res.value);
				this.isLoggedIn = true;
				this.store.dispatch(new Login({ authToken: this.tokenStorage.getToken() }));
				this.currentUser = this.tokenStorage.getUser();
				this.router.navigateByUrl(this.returnUrl);
			  },
			  error => {
				this.invalidLogin = true;
				if (error.error.message) {
				  this.errorMessage = error.error.message;
				} else {
				  this.errorMessage = 'Unknown error occured, try after some time..';
				}
			  }
			);
		  }
		).catch(
			error => {
				this.invalidLogin = true;
				if (error.error.message) {
				  this.errorMessage = error.error.message;
				} else {
				  this.errorMessage = 'Unknown error occured, try after some time..';
				}
			  }
		);
	  }

	  signInWithFB(): void {
		this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
		  data => {
			this.socialUser = data;
			const tokenFace = new TokenClass(this.socialUser.authToken);
			this.oauthService.facebook(tokenFace).subscribe(
			  res => {
				this.tokenStorage.setToken(res.value);
				this.isLoggedIn = true;
				this.store.dispatch(new Login({ authToken: this.tokenStorage.getToken() }));
				this.currentUser = this.tokenStorage.getUser();
				this.router.navigateByUrl(this.returnUrl);
			  },
			  error => {
				this.invalidLogin = true;
				if (error.error.message) {
				  this.errorMessage = error.error.message;
				} else {
				  this.errorMessage = 'Unknown error occured, try after some time..';
				}
			  }
			);
		  }
		).catch(
			error => {
				this.invalidLogin = true;
				if (error.error.message) {
				  this.errorMessage = error.error.message;
				} else {
				  this.errorMessage = 'Unknown error occured, try after some time..';
				}
			  }
		);
	  }
	  login(user: User): void {
		this.tokenStorage.saveUser(user);
		this.isLoggedIn = true;
		this.currentUser = this.tokenStorage.getUser();
	  }
	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		this.authNoticeService.setNotice(null);
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	/**
	 * Form initalization
	 * Default params, validators
	 */
	initLoginForm() {
		// demo message to show
		// if (!this.authNoticeService.onNoticeChanged$.getValue()) {
		// 	const initialNotice = `Use account
		// 	<strong>${DEMO_PARAMS.EMAIL}</strong> and password
		// 	<strong>${DEMO_PARAMS.PASSWORD}</strong> to continue.`;
		// 	this.authNoticeService.setNotice(initialNotice, 'info');
		// }

		this.loginForm = this.fb.group({
			email: [DEMO_PARAMS.EMAIL, Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.email
				//Validators.maxLength(20)
			])
			],
			password: [DEMO_PARAMS.PASSWORD, Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(20)
			])
			],
			recaptcha: [''],
		});
	}

	/**
	 * Form Submit
	 */
	submit() {
		// alert(JSON.stringify(this.roles));
		const controls = this.loginForm.controls;
		/** check form */
		if (this.loginForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.loading = true;

		const authData = {
			email: controls.email.value,
			password: controls.password.value
		};
		this.auth
			.login(authData.email, authData.password)
			.pipe(
				tap(user => {
					if (user) {
						this.store.dispatch(new Login({authToken: user.accessToken}));
						this.currentUser = this.tokenStorage.getUser();
						this.router.navigateByUrl(this.returnUrl); // Main page
					} else {
						this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
					}
				}),
				takeUntil(this.unsubscribe),
				finalize(() => {
					this.loading = false;
					this.cdr.markForCheck();
				})
			)
			.subscribe(
				data => {
					this.tokenStorage.saveToken(data.accessToken);
					this.tokenStorage.saveUser(data);
					this.isLoggedIn = true;
					this.loginCount = 0;
					this.usernm = authData.email;
					console.log(this.usernm);
					sessionStorage.setItem(JSON.stringify(this.usernm), JSON.stringify(this.loginCount));
		   this.roles = this.tokenStorage.getUser().roles;
		   sessionStorage.setItem(USER_ROLE, this.tokenStorage.getUser().roles);
		// alert(window.sessionStorage.getItem(USER_ROLE));
		   this.store.dispatch(new Login({authToken: this.tokenStorage.getToken()}));
		   this.currentUser = this.tokenStorage.getUser();
		//    alert(JSON.stringify(this.tokenStorage.getUser()));
				},
				 error => {
					this.loginCount++;
					this.usernm = authData.email;
					console.log(this.usernm);

				   // tslint:disable-next-line: one-variable-per-declaration
					this.array = sessionStorage.getItem(JSON.stringify(this.usernm));
					if (this.array === null) {
						sessionStorage.setItem(JSON.stringify(this.usernm), JSON.stringify(this.loginCount));
				   } else {
					   this.array = sessionStorage.getItem(JSON.stringify(this.usernm));
						  this.loginCount = this.array;
						  this.loginCount++;
						  sessionStorage.setItem(JSON.stringify(this.usernm), JSON.stringify(this.loginCount));
				   }
				   if(error.error.message)
				   {
				   // tslint:disable-next-line: align
				   if (this.loginCount >= 3) {
					   this.errorMessage = "Cross login attempt";
					   console.log(this.errorMessage);
				   } else {
					this.errorMessage =  "Incorrect login username or password";
					console.log(this.errorMessage);
				   }
				   }
		   }
			);
	}

	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.loginForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}
	show() {

		this.router.navigate(['TestHomeList']);
	  }
	  handleSuccess(e) {
		this.captchaSuccess = true;
		console.log('ReCaptcha', e);
	  }

	  openForgotPassModal(): void {
		const ref = this.modalservice.open(OTPDialogueComponent, { centered: true });
		ref.componentInstance.title = 'Reset Password';
		ref.componentInstance.btn = 'Send OTP';
		ref.componentInstance.type = 'reset';
	  }
	  openVerifyEmailModal(): void {
		const ref = this.modalservice.open(OTPDialogueComponent, { centered: true });
		ref.componentInstance.title = 'Verify email';
		ref.componentInstance.btn = 'Send Link';
		ref.componentInstance.type = 'verify';
	  }
}
