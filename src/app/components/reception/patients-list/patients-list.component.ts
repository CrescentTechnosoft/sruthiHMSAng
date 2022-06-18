import { Component, OnInit, ViewChild, OnDestroy, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { Patient, PaginatorSetting, Profile } from './patients-list.model';
import { PatientsListService } from './patients-list.service';
import { CommonService } from 'src/app/services/common.service';

import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss'],
  providers: [PatientsListService]
})
export class PatientsListComponent implements OnInit, OnDestroy {
  paginatorSetting: PaginatorSetting;
  paginatorCounts: Array<number>;
  displayedColumns: string[];
  dataSource: MatTableDataSource<Patient>;
  profile: Profile;
  formGroup: FormGroup;
  destroy$: Subject<boolean>;

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('profileRef') profileRef: TemplateRef<ViewChild>;

  constructor(
    private service: PatientsListService,
    private router: Router,
    private toastr: ToastrService,
    private common: CommonService,
    private dialog: MatDialog,
    private loader: NgxUiLoaderService
  ) { }

  public ngOnInit(): void {
    this.common.mainData.next({ header: 'Patients List', treeView: 'liReception', subTreeView: '', menu: 'liPtList' });
    this.initProperties();
    this.getPatients('', 1, 20);
  }

  public getPatients(search: string, page: number, count: number): void {
    this.loader.startBackground('getData');
    this.service.getPatients(search, page, count)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (d) => {
          this.dataSource.data = d.data;
          this.paginatorSetting.length = d.total;
        },
        complete: () => this.loader.stopBackground('getData')
      });
  }

  public changeSource() {
    this.getPatients(this.formGroup.get('search').value, this.paginator.pageIndex + 1, this.paginator.pageSize);
  }

  public goToUpdate(uuid: string) {
    this.router.navigateByUrl('reception/update-patient/' + uuid);
  }

  public deletePatient(id: number) {
    Swal.fire({
      title: 'Confirmation',
      text: 'Do you want to Delete the Patient Details?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'No',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deletePatient(id)
          .toPromise()
          .then(d => {
            this.getPatients('', 1, 20);
            this.toastr.success(d);
          });
      }
    });
  }

  public showProfile(id: string) {
    this.service.getProfile(id)
      .toPromise()
      .then(d => {
        for (let obj in this.profile)
          this.profile[obj] = d[obj];
        this.dialog.open(this.profileRef, { width: '500px' });
      });

  }

  public goToPage(id: string, page: string) {
    localStorage.setItem('PID', id);
    this.router.navigateByUrl(page);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  private initProperties() {
    this.destroy$ = new Subject();
    this.formGroup = new FormGroup({
      search: new FormControl('')
    });

    this.formGroup.get('search').valueChanges
      .pipe(
        debounceTime(1000),
        takeUntil(this.destroy$.asObservable()),
      )
      .subscribe({
        next: () => {
          this.paginator.pageIndex = 0;
          this.changeSource()
        }
      });

    this.paginatorSetting = {
      length: 0,
      index: 0,
      pageSize: 20
    };
    this.profile = {
      id: 0,
      name: '',
      age: '',
      gender: '',
      dob: '',
      contact: '',
      email: '',
      address: ''
    };
    this.displayedColumns = ['id', 'name', 'age', 'gender', 'contact', 'actions'];
    this.dataSource = new MatTableDataSource([]);
    this.paginatorCounts = [10, 20, 50, 100];
  }
}
