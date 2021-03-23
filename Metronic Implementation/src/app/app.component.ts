import { Subscription } from 'rxjs';
// Angular
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
// Layout
import { LayoutConfigService, SplashScreenService, TranslationService } from './core/_base/layout';
// language list
import { locale as enLang } from './core/_config/i18n/en';
import { locale as chLang } from './core/_config/i18n/ch';
import { locale as esLang } from './core/_config/i18n/es';
import { locale as jpLang } from './core/_config/i18n/jp';
import { locale as deLang } from './core/_config/i18n/de';
import { locale as frLang } from './core/_config/i18n/fr';
import { locale as hiLang } from './core/_config/i18n/hi';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';  

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'body[kt-root]',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
	// Public properties
	title = 'Zonions';
	loader: boolean;
	private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
 
	/**
	 * Component constructor
	 *
	 * @param translationService: TranslationService
	 * @param router: Router
	 * @param layoutConfigService: LayoutCongifService
	 * @param splashScreenService: SplashScreenService
	 */
	constructor(private translationService: TranslationService,
				         private router: Router,private activatedRoute: ActivatedRoute,
				         private layoutConfigService: LayoutConfigService,
				         private splashScreenService: SplashScreenService,private titleService: Title) {

		// register translations
		this.translationService.loadTranslations(enLang, chLang, esLang, jpLang, deLang, frLang, hiLang);
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.router.events.pipe(  
			filter(event => event instanceof NavigationEnd),  
		  ).subscribe(() => {  
			const rt = this.getChild(this.activatedRoute);  
			rt.data.subscribe(data => {  
			  console.log(data);  
			  this.titleService.setTitle(data.title)});  
		  });
		// enable/disable loader
		this.loader = this.layoutConfigService.getConfig('loader.enabled');

		const routerSubscription = this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				// hide splash screen
				this.splashScreenService.hide();

				// scroll to top on every route change
				window.scrollTo(0, 0);

				// to display back the body content
				setTimeout(() => {
					document.body.classList.add('kt-page--loaded');
				}, 500);
			}
		});
		this.unsubscribe.push(routerSubscription);
	}
	getChild(activatedRoute: ActivatedRoute) {  
		if (activatedRoute.firstChild) {  
		  return this.getChild(activatedRoute.firstChild);  
		} else {  
		  return activatedRoute;  
		}  
	  
	  }  
	/**
	 * On Destroy
	 */
	ngOnDestroy() {
		this.unsubscribe.forEach(sb => sb.unsubscribe());
	}
}
