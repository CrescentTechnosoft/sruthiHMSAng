import { Component, OnInit, OnDestroy, TemplateRef, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { BillingService } from './shared/billing.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
import {
  Consultant,
  TempData,
  Patient,
  Fee,
  Test,
  BillNo,
  Registration
} from './shared/opbilling.model';
import { MatDialog } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { debounceTime, map, takeUntil, startWith } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-op-billing',
  templateUrl: './op-billing.component.html',
  styleUrls: ['./op-billing.component.scss'],
  providers: [BillingService],
})
export class OPBillingComponent implements OnInit, OnDestroy {
  editMode: boolean;
  searchList: Array<Patient>;
  pidList: Array<Registration>;
  consList: Array<Consultant>;
  feesList: Array<Fee>;
  testList: Array<Test>;
  groupTestList: Array<Test>;
  profilesList: Array<Test>;
  // feesTable: Array<FeesData>;
  billYears: Array<string>;
  billNos: Array<BillNo>;
  payTypes: Array<string>;
  cardTypes: Array<string>;
  paymentMethods: Array<string>;
  tempData: TempData;
  feesTypes: Array<string>;
  filteredFeesTypes$: Observable<string[]>;
  destroy$: Subject<void>;
  formGroup: FormGroup;

  @ViewChild('cardTemplate') cardTemplate: TemplateRef<ViewChild>;
  @ViewChild('patientsTemplate') patientsTemplate: TemplateRef<ViewChild>;
  @ViewChild('cost') cost: ElementRef<ViewChild>;
  @ViewChild('feesType') feesType: ElementRef<ViewChild>;

  constructor(
    private service: BillingService,
    private toastr: ToastrService,
    private common: CommonService,
    private dialog: MatDialog,
    private ngxLoaderService: NgxUiLoaderService,
    private renderer: Renderer2,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.common.mainData.next({ header: 'OP Billing', treeView: 'liCashCounter', subTreeView: '', menu: 'liOPBill' });
    this.initProperties();
    this.autoCompleteFeesType();
    this.service.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.pidList.push(...response.pid);
          this.consList.push(...response.cons);
          this.feesList.push(...response.fees);
          this.testList.push(...response.lab);
          this.groupTestList.push(...response.groupTests);
          this.profilesList.push(...response.profiles);

          const feesVal: Array<string> = response.fees.map(f => f.name)
            .concat(response.lab.map(m => m.name), response.groupTests.map(m => m.name), response.profiles.map(m => m.name))
            .sort();
          this.feesTypes.push(...feesVal);
          this.paymentMethods.push(...response.payType);
          this.cardTypes.push(...response.cardType);

          const id = localStorage.getItem('PID');
          if (id !== null) {
            localStorage.removeItem('PID');
            this.setPatientID(parseInt(id));
          }
        }
      });
  }

  searchPatients(evt: KeyboardEvent) {
    if ((evt.key === 'Enter') && this.formGroup.get('search').value !== '') {
      this.service.getPatientsList(this.formGroup.get('search').value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response.patients.length > 0) {
              this.searchList.splice(0, this.searchList.length, ...response.patients);
              this.dialog.open(this.patientsTemplate);
            }
            else {
              this.toastr.info('No Patients Found', 'Empty Data');
            }
          }
        });
    }
  }

  setPatientID(id: number) {
    // if (!this.pidList.includes(Number(id))) {
    //   this.pidList.push(id);
    // }
    this.formGroup.get('ptId').patchValue(id.toString());
    this.dialog.closeAll();
    this.searchList.length = 0;
    this.getPatientDetails();
  }

  getPatientDetails(): void {
    const id = this.formGroup.get('ptId').value;
    if (id !== '') {
      this.service.getPatientDetails(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.formGroup.patchValue({
              name: response.name,
              age: response.age,
              gender: response.gender,
              contact: response.contact,
              consultant: response.consultant
            });
          }
        });
    }
  }

  getFees(evt: KeyboardEvent): void {
    if (evt.key === 'Enter') {
      const value = this.formGroup.get('feesType').value;
      const index = this.feesList.findIndex(d => d.name === value);
      const testIndex = index > -1 ? 0 : this.testList.findIndex(d => d.name === value);
      const groupTestIndex = (index > -1 || testIndex > -1) ? 0 : this.groupTestList.findIndex(f => f.name === value);
      const profileIndex = (index > -1 || testIndex > -1 || groupTestIndex > -1) ? 0 : this.profilesList.findIndex(f => f.name === value);

      let dept = '';
      let testType = '';

      if (index > -1)
        dept = this.feesList[index].department;
      else if (testIndex > -1) {
        dept = 'Lab';
        testType = 'Test';
      }
      else if (groupTestIndex > -1) {
        dept = 'Lab';
        testType = 'GroupTest';
      }
      else if (profileIndex > -1) {
        dept = 'Lab';
        testType = 'Profile';
      }

      if (dept !== '') {
        let isExists = (this.formGroup.get('addedFees') as FormArray).controls.findIndex(d => d.get('feesType').value === value) > -1;
        if (isExists)
          this.toastr.warning(value + ' is already added');
        else {
          let method = '';
          let id = 0;
          switch (testType) {
            case '':
              method = 'fees-cost';
              id = this.feesList[index].id;
              break;

            case 'Test':
              method = 'test-cost';
              id = this.testList[testIndex].id;
              break;

            case 'GroupTest':
              method = 'group-test-cost';
              id = this.groupTestList[groupTestIndex].id;
              break;

            case 'Profile':
              method = 'profile-cost';
              id = this.profilesList[profileIndex].id;
              break;

            default: break;
          }
          this.service.getFees(method, id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: response => {
                this.tempData.dept = dept;
                this.tempData.feesId = id;
                this.tempData.testType = testType;
                this.tempData.category = response.category;
                this.formGroup.controls['cost'].patchValue(response.cost);

                this.renderer.selectRootElement(this.cost.nativeElement).focus();
              }
            });
        }
      }
    }
  }

  addFees(evt: KeyboardEvent): void {
    if (evt.key === 'Enter' && this.formGroup.get('cost').value !== null && this.tempData.dept !== '') {
      (this.formGroup.get('addedFees') as FormArray).push(
        this.fb.group({
          dept: [this.tempData.dept],
          category: [this.tempData.category],
          feesType: [this.formGroup.get('feesType').value],
          feesId: [this.tempData.feesId],
          cost: [this.formGroup.get('cost').value],
          testType: [this.tempData.testType],
          discount: [0]
        })
      );
      this.tempData.dept = '';
      this.calculateTotal();
      this.formGroup.patchValue({
        feesType: '',
        cost: null
      });
      this.renderer.selectRootElement(this.feesType.nativeElement).focus();
    }
  }

  removeFees(index: number) {
    (this.formGroup.get('addedFees') as FormArray).removeAt(index);
    this.calculateTotal();
  }

  private getPayingType(): string {
    return this.formGroup.get('payType').value !== 'Others' ? this.formGroup.get('payType').value : this.formGroup.get('otherType').value;
  }

  public saveBill(): void {
    if (this.formGroup.get('ptId').value == '')
      this.toastr.info('Select the Patient ID');
    else if (this.formGroup.get('consultant').value === '')
      this.toastr.info('Select the Consultant Name');
    else if ((this.formGroup.get('addedFees') as FormArray).controls.length === 0)
      this.toastr.info('No Fees were Added!!!');
    else if (this.getPayingType() === '')
      this.toastr.info('Select / Enter Paying Type');
    else {
      this.ngxLoaderService.start();
      this.service.saveBill(this.formGroup.getRawValue())
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response.status) {
              Swal.fire({
                title: response.message,
                text: "Bill No is " + response.bill_no,
                icon: 'success',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Print the Bill',
                cancelButtonText: 'Close',
                allowOutsideClick: false
              }).then((result) => {
                if (result.isConfirmed) {
                  this.common.printPage(`op-bill/${response.id}/clinic`);
                }
              });
              this.resetPage();
            }
            else {
              this.toastr.error('An error occured while saving the Bill', 'Error');
            }
          },
          complete: () => this.ngxLoaderService.stop()
        });
    }
  }

  public view(): void {
    this.editMode = true;
    this.pidList = [];
    this.formGroup.get('addedFees').patchValue([]);

    this.service.getBillYears()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          this.billYears.splice(0, this.billYears.length, ...response.years);
          this.billNos.splice(0, this.billNos.length, ...response.bill_nos);
          if (response.years.length > 0) {
            this.formGroup.get('year').patchValue(response.years[0]);
          }
          else {
            this.billNos.length = 0;
          }
        }
      });
  }

  getBillNos(): void {
    const year = this.formGroup.get('year').value;
    if (year === '')
      this.billNos.length = 0;
    else
      this.service.getBillNos(year)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: response => { this.billNos.splice(0, this.billNos.length, ...response); }
        });
  }

  getBillDetails(): void {
    if (this.formGroup.get('year').value !== '' && this.formGroup.get('billNo').value !== '') {
      this.service.getBillDetails(this.formGroup.get('billNo').value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.formGroup.patchValue({
              oldPtId: response.data.pt_id,
              name: response.data.name,
              age: response.data.age,
              gender: response.data.gender,
              contact: response.data.contact,
              consultant: response.data.consultant,
              total: response.data.total,
              discount: response.data.discount,
              subTotal: response.data.sub_total,
              paying: response.data.paying,
              due: response.data.due,
              refund: response.data.refund,
              payType: response.data.pay_type,
              otherType: response.data.other_type,
              cardNo: response.data.card_no,
              cardType: response.data.card_type,
              cardExpiry: response.data.card_expiry
            });

            (this.formGroup.get('addedFees') as FormArray).controls.length = 0;
            response.fees_data.forEach((elem) => {
              (this.formGroup.get('addedFees') as FormArray).push(
                this.fb.group({
                  dept: [elem.dept],
                  category: [elem.category],
                  feesType: [elem.fees_type],
                  feesId: [elem.fees_id],
                  cost: [elem.cost],
                  testType: [elem.test_type],
                  discount: [elem.discount]
                })
              );
            });
          }
        });
    }
  }

  updateBillDetails(): void {
    if (this.editMode) {
      if (this.formGroup.get('year').value === '')
        this.toastr.info('Select the Bill Year');
      else if (this.formGroup.get('billNo').value === '')
        this.toastr.info('Select the Bill No');
      else if (this.formGroup.get('consultant').value === '')
        this.toastr.info('Select the Consultant Name');
      else if ((this.formGroup.get('addedFees') as FormArray).controls.length === 0)
        this.toastr.info('No Fees were Added!!!');
      else if (this.getPayingType() === '')
        this.toastr.info('Select / Enter Paying Type');
      else {
        this.ngxLoaderService.start();
        this.service.updateBillDetails(this.formGroup.get('billNo').value, this.formGroup.getRawValue())
          .toPromise()
          .then((d: string) => {
            this.toastr.success(d);
          })
          .finally(() => this.ngxLoaderService.stop());
      }
    }
  }

  deleteBill(): void {
    if (this.editMode) {
      if (this.formGroup.get('year').value === '') {
        this.toastr.info('Select the Bill Year');
      }
      else if (this.formGroup.get('billNo').value === '')
        this.toastr.info('Select the Bill No');
      else {
        this.common.triggerSwal('Do you want to Delete the Bill?')
          .then(swal => {
            if (swal.isConfirmed) {
              this.ngxLoaderService.start();
              this.service.deleteBill(this.formGroup.get('billNo').value)
                .toPromise().then((d: string) => {
                  this.toastr.success(d);
                  this.resetPage();
                })
                .finally(() => this.ngxLoaderService.stop());
            }
          });
      }
    }
  }

  PrintBill(): void {
    if (this.formGroup.get('year').value === '') {
      this.toastr.error('Select the Bill Year');
    }
    else if (this.formGroup.get('billNo').value === '')
      this.toastr.error('Select the Bill No');
    else {
      this.common.printPage(`op-bill/${this.formGroup.get('billNo').value}/${this.formGroup.get('billType').value}`);
    }
  }

  resetPage(): void {
    this.editMode = false;
    this.formGroup.patchValue({
      oldPtId: '',
      search: '',
      ptId: '',
      pid: '0',
      name: '',
      age: '',
      gender: 'Male',
      contact: '',
      consultant: '',
      feesType: '',
      cost: null,
      otherType: '',
      total: 0,
      discount: 0,
      subTotal: 0,
      paying: 0,
      due: 0,
      refund: 0,
      cardNo: '',
      cardType: '',
      cardExpiry: '',
      payType: 'Cash',
      year: '',
      billNo: ''
    });
    (this.formGroup.get('addedFees') as FormArray).controls.length = 0;
    this.billYears.length = 0;
    this.billNos.length = 0;
    this.searchList.length = 0;
    this.populateID();
  }

  populateID(): void {
    this.service.getIds()
      .toPromise()
      .then(d => {
        this.pidList.splice(0, this.pidList.length, ...d);
      });
  }

  showCardDialog(type: string): void {
    if (type === 'Card') {
      this.dialog.open(this.cardTemplate);
    }
  }
  calculateTotal(): void {
    let total = 0, discount = 0;

    (this.formGroup.get('addedFees') as FormArray).controls.forEach(elem => {
      total += parseFloat(elem.get('cost').value);
      discount += elem.get('discount').value
    });

    const subTotal = total - discount;
    this.formGroup.patchValue({
      total: total.toFixed(2),
      discount: discount.toFixed(2),
      subTotal: subTotal.toFixed(2),
      paying: subTotal.toFixed(2),
      due: 0,
      refund: 0
    });
  }

  changePayingAmount(): void {
    const balance = (this.formGroup.get('subTotal').value ?? 0) - (this.formGroup.get('paying').value ?? 0);

    if (balance === 0) {
      this.formGroup.get('due').patchValue(balance);
      this.formGroup.get('refund').patchValue(0);
    }
    else if (balance > 0) {
      this.formGroup.get('due').patchValue(balance);
      this.formGroup.get('refund').patchValue(0);
    }
    else {
      this.formGroup.get('refund').patchValue(Math.abs(balance));
      this.formGroup.get('due').patchValue(0);
    }
  }

  addPayType(): void {
    const payType = this.formGroup.get('otherType').value;
    if (payType !== '' && !this.paymentMethods.includes(payType)) {
      this.service.addPayType(payType)
        .toPromise()
        .then((d: string) => {
          this.toastr.success(d);
          this.paymentMethods.push(payType);
        }, e => console.log(e));
    }
  }

  removePayType(): void {
    const payType = this.formGroup.get('otherType').value;
    if (this.paymentMethods.includes(payType)) {
      this.service.removePayType(payType)
        .toPromise()
        .then((d: string) => {
          const index = this.paymentMethods.findIndex((d: string) => d === payType);
          this.paymentMethods.splice(index, 1);
          this.formGroup.get('otherType').patchValue('');
          this.toastr.success(d);
        });
    }
  }

  addCardType(): void {
    const cardType = this.formGroup.get('cardType').value;
    if (cardType !== '' && !this.cardTypes.includes(cardType)) {
      this.service.addCardType(cardType)
        .toPromise()
        .then((d: string) => {
          this.toastr.success(d);
          this.cardTypes.push(cardType);
        });
    }
  }

  removeCardType(): void {
    const cardType = this.formGroup.get('cardType').value;
    if (this.cardTypes.includes(cardType)) {
      this.service.removeCardType(cardType)
        .toPromise()
        .then((d: string) => {
          const index = this.cardTypes.findIndex((d: string) => d === cardType);
          this.cardTypes.splice(index, 1);
          this.formGroup.get('cardType').patchValue('');
          this.toastr.success(d);
        });
    }
  }

  get addedFees() {
    return <FormArray>this.formGroup.get('addedFees');
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initProperties() {
    this.payTypes = ['Cash', 'Card', 'Others'];
    this.searchList = [];
    this.pidList = [];
    this.consList = [];
    this.feesList = [];
    this.testList = [];
    this.groupTestList = [];
    this.profilesList = [];
    this.billYears = [];
    this.billNos = [];
    this.cardTypes = [];
    this.paymentMethods = [];
    this.feesTypes = [];
    // this.filteredFeesTypes = [];
    this.editMode = false;
    this.destroy$ = new Subject<void>();

    this.formGroup = new FormGroup({
      oldPtId: new FormControl({ value: '', disabled: true }),
      search: new FormControl(''),
      ptId: new FormControl(''),
      name: new FormControl(''),
      age: new FormControl(''),
      gender: new FormControl('Male'),
      billType: new FormControl('hospital'),
      contact: new FormControl(''),
      consultant: new FormControl(''),
      feesType: new FormControl(''),
      cost: new FormControl(null),
      otherType: new FormControl(''),
      total: new FormControl(0),
      discount: new FormControl(0),
      subTotal: new FormControl(0),
      paying: new FormControl(0),
      due: new FormControl(0),
      refund: new FormControl(0),
      cardNo: new FormControl(''),
      cardType: new FormControl(''),
      cardExpiry: new FormControl(''),
      payType: new FormControl('Cash'),
      year: new FormControl(''),
      billNo: new FormControl(''),
      addedFees: new FormArray([])
    });

    this.tempData = {
      dept: '',
      category: '',
      testType: '',
      billYear: '',
      billNo: null,
      cost: '0',
      feesId: null
    };
  }

  private autoCompleteFeesType() {
    this.filteredFeesTypes$ = this.formGroup.controls['feesType'].valueChanges
      .pipe(
        debounceTime(500),
        startWith(''),
        map(map => map === '' ? [] : this.feesTypes.filter(f => f.toLowerCase().startsWith(map.toLowerCase())))
      );
  }
}
