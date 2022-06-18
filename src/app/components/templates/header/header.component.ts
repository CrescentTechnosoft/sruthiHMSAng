import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonService, MainData } from 'src/app/services/common.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

declare function init_sidebar(): any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit, OnDestroy {
  header: string;
  loading: boolean;
  routeSubs$: Subscription;

  constructor(private common: CommonService) { }

  ngOnInit(): void {
    this.header = '';
    //Reverting Treeview to Original State
    $('.side-menu li').removeClass('active').children('a').children('span').removeClass('fa-chevron-down').addClass('fa-chevron-right');

    this.subscribeCustomRouteNavigations();
  }

  //Looking for Custom Passing datas (i.e) Header,Treeview,etc,.
  private subscribeCustomRouteNavigations() {
    this.routeSubs$ = this.common.mainData.pipe(delay(0)).subscribe({
      next: (d) => {
        init_sidebar();
        const color: string = localStorage.getItem('CrescentBGColor') ?? '#ffffff';
        $('.background-All').css('background-color', color);
        $('#bgColor').val(color);
        this.toggleTreeViewStatus(d);
      }
    });
  }

  //Change Treeview Menus and Changing Header Texts
  private toggleTreeViewStatus(d: MainData) {
    const width = $(window).width();

    if (width < 768 && $('body').hasClass('nav-sm')) {
      const body = $('body');
      $('#sidebar-menu').find('li.active-sm ul').show();
      $('#sidebar-menu').find('li.active-sm').addClass('active').removeClass('active-sm');
      body.removeClass('nav-sm').addClass('nav-md');
    }

    $('li').removeClass('active');
    this.header = d.header;

    if (d.treeView !== '' && (width < 768 || width > 992)) {
      $('#' + d.treeView).addClass('active').children('a').children('span').removeClass('fa-chevron-right').addClass('fa-chevron-down');
      $('#' + d.treeView).children('ul').css('display', 'block');
    }

    if (d.subTreeView !== '') {
      $('#' + d.subTreeView).addClass('active').children('a').children('span').removeClass('fa-chevron-right').addClass('fa-chevron-down');
      $('#' + d.subTreeView).children('ul').css('display', 'block');
    }
    else {
      $('.sub_menu').parent('ul').parent('li').removeClass('active').children('a').children('span').removeClass('fa-chevron-down').addClass('fa-chevron-right');
      $('.sub_menu').parent('ul').css('display', 'none');
    }

    if (d.menu !== '')
      $('#' + d.menu).addClass('active');
  }


  ngOnDestroy() {
    this.routeSubs$.unsubscribe();
  }
}
