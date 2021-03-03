import { Input, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth';

const USER_ROLE = 'auth-role';

export class MenuConfig implements OnInit {

	private roles: string[] = [];
	isLoggedIn = false;
	role = window.sessionStorage.getItem(USER_ROLE);
	public defaults: any = {
		header: {
			self: {},
			items: [
				{
					title: 'Dashboards',
					root: true,
					alignment: 'left',
					page: '/dashboard',
					translate: 'MENU.DASHBOARD'
				},
				{
					title: 'Restaurants',
					root: true,
					alignment: 'left',
					toggle: 'click',
					submenu: [
								{
									title: 'Add Restaurant',
									page: '/restaurants/addRestaurant'

								},
								{
									title: 'Restaurant List',
									page: '/restaurants/restaurant'
								},
								{
									title: 'Active Restaurants',
									page: '/restaurants/restHome'
								},
					]
				},
				{
					title: 'User Management',
					root: true,
					alignment: 'left',
					toggle: 'click',
					submenu: [
						{

								title: 'Active Users',
								page: '/restaurants/users'

						}
					]
				}
			]
		},
		aside: {
			self: {},
			items: [
				{
					title: 'Dashboard',
					root: true,
					icon: 'flaticon2-architecture-and-city',
					page: '/dashboard',
					translate: 'MENU.DASHBOARD',
					bullet: 'dot',
				},
				// {
				// 	title: 'Layout Builder',
				// 	root: true,
				// 	icon: 'flaticon2-expand',
				// 	page: '/builder'
				// },
				{
					title: 'Restaurants',
					root: true,
					bullet: 'dot',
					icon: 'flaticon2-expand',
					alignment: 'left',
					toggle: 'click',
					submenu: [
								{
									title: 'Add Restaurant',
									page: '/restaurants/addRestaurant'

								},
								{
									title: 'Restaurant List',
									page: '/restaurants/restaurant'
								},
								{
									title: 'Active Restaurants',
									page: '/restaurants/restHome'
								},


					]
				},
				{
					title: 'User Management',
					root: true,
					bullet: 'dot',
					icon: 'flaticon2-user-outline-symbol',
					alignment: 'left',
					toggle: 'click',
					submenu: [
						{

								title: 'Active Users',
								page: '/restaurants/users'

						}
					]
				}
			]
		},
	};

	public defaults1: any = {
		header: {
			self: {},
			items: [
				{
					title: 'Restaurants',
					root: true,
					alignment: 'left',
					toggle: 'click',
					submenu: [
						{
							title: 'Active Restaurants',
							page: '/restaurants/restHome'
						}
					]
				},
			]
		},
		aside: {
			self: {},
			items: [
				{
					title: 'Restaurants',
					root: true,
					alignment: 'left',
					toggle: 'click',
					submenu: [
								{
									title: 'Active Restaurants',
									page: '/restaurants/restHome'
								}
					]
				}
			]
		}
	};
	constructor(private tokenStorageService: TokenStorageService) { }
	ngOnInit(): void {
		this.isLoggedIn = !!this.tokenStorageService.getToken();
		if (this.isLoggedIn) {
			const user = this.tokenStorageService.getUser();
			// if (user.roles === 'ROLE_ADMIN') {
			//   this.admin = true;
			// }
			this.roles = user.roles;
			// alert(this.tokenStorageService.getUser());
			this.role = sessionStorage.getItem(USER_ROLE);

	}
}
	public get configs(): any {
		if (this.role === 'ROLE_ADMIN') {
			return this.defaults;
		} else {
			return this.defaults1;
		}

	}





}


