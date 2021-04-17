
import { Component, OnInit, ViewChild } from '@angular/core';
import { useAnimation } from '@angular/animations';
import {
  CloseScrollStrategy,
  GlobalPositionStrategy,
  IgxDialogComponent,
  IgxOverlayOutletDirective,
  PositionSettings,
  slideInBottom,
  slideOutTop
} from 'igniteui-angular';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'kt-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  @ViewChild(IgxOverlayOutletDirective, { static: true })
  public outlet: IgxOverlayOutletDirective;

  @ViewChild('dialog1', { read: IgxDialogComponent, static: true })
  public dialog: IgxDialogComponent;

  private _animaitonSettings: PositionSettings = {
    openAnimation: useAnimation(slideInBottom, { params: { fromPosition: 'translateY(100%)' } }),
    closeAnimation: useAnimation(slideOutTop, { params: { toPosition: 'translateY(-100%)' } })
  };
  constructor(private router: Router ,private title: Title) { }

  ngOnInit(): void {
    this._dialogOverlaySettings2 = {
      modal: true,
      outlet: this.outlet,
      scrollStrategy: new CloseScrollStrategy(),
      positionStrategy: new GlobalPositionStrategy(this._animaitonSettings)
    };
  }
  private _dialogOverlaySettings2;

  public openDialog() {
    this._dialogOverlaySettings2.outlet = this.outlet;
    this.dialog.open(this._dialogOverlaySettings2);
  }
  Login() {
    this.router.navigate(['auth', 'login']);
  }
}
