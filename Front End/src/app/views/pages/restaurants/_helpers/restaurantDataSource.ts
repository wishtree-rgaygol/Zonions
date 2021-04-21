import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { RestaurantService } from '../_services/restaurant.service';
// tslint:disable-next-line: max-line-length
import { Restaurant , RestaurantResponse} from '/home/rgaygol/Documents/Zonions Project/Git hub Clone folder/Zonions/Zonions/Front End/src/app/views/pages/restaurants/_helpers/restaurant';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ViewChild } from '@angular/core';

export class RestaurantDataSource implements DataSource<Restaurant> {

    private todoSubject = new BehaviorSubject<Restaurant[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private countSubject = new BehaviorSubject<number>(0);
    dataSource: RestaurantDataSource;
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  listData: MatTableDataSource<Restaurant>;

    public counter$ = this.countSubject.asObservable();
    restoList: any;
 

    constructor(private restaurantService: RestaurantService ) {
    }

    connect(collectionViewer: CollectionViewer): Observable<Restaurant[]> {
        return this.todoSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.todoSubject.complete();
        this.loadingSubject.complete();
        this.countSubject.complete();
    }

    loadTodos(pageNumber = 0, pageSize = 10): any {
        this.loadingSubject.next(true);
        this.restaurantService.AllPaginateRestaurant({ page: pageNumber, size: pageSize })
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            // tslint:disable-next-line: deprecation
            .subscribe((result: RestaurantResponse ) => {
                this.todoSubject.next(result.content);
                this.countSubject.next(result.totalElements);
                this.restoList = this.todoSubject.value;
                // this.listData = this.restoList;
                console.log(this.restoList[0].id);

            }
            );
    }
    filterData(params) {

        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.restoList.length ; i++) {
            if (this.restoList[i].restaurantName.toLowerCase().indexOf(params.toLowerCase()) > -1) {
                console.log(this.restoList[i]);
                this.loadingSubject.next(true);
                // tslint:disable-next-line: deprecation
                this.restaurantService.getRestaurantById(this.restoList[i].id).subscribe( (result: RestaurantResponse ) => {
                    this.todoSubject.next(result.content);
                    this.countSubject.next(result.totalElements);
                });


                // this.dataSource = new RestaurantListDataSource(this.restoList[i]);
                // this.dataSource.loadTodos();
             }
        }
    }

}