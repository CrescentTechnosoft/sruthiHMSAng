import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { XRayService, Inputs } from './Services/xray.service';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { HttpEventType } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-xray-upload',
  templateUrl: './xray-upload.component.html',
  styleUrls: ['./xray-upload.component.scss'],
  providers: [XRayService]
})


export class XRayUploadComponent implements OnInit, OnDestroy {
  years: Array<string>;
  ipNos: Array<number>;
  xrays: Array<string>;
  inputs: Inputs;
  imageSrc: string | ArrayBuffer;
  file: File;
  subs: Subscription;
  uploadPercentage: number;
  showUploadProgress: boolean;

  constructor(private common: CommonService, private service: XRayService, private toastr: ToastrService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.common.mainData.next({ header: 'XRay Upload', treeView: 'liIProcess', subTreeView: '', menu: 'liXRayUpload' });
    this.years = this.ipNos = this.xrays = [];
    this.imageSrc = 'assets/Images/Assets/logo.jpg';
    this.uploadPercentage = 0;
    this.showUploadProgress = false;
    this.file = this.subs = null;
    this.inputs = this.service.GetInputs();

    this.service.GetYears()
      .toPromise()
      .then(d => {
        this.years = d.years;
        this.ipNos = d.ipNos;
        if (d.years.length > 0)
          this.inputs.year = d.years[0];
      });
  }

  GetIPNos(): void {
    this.inputs.xray = '';
    if (this.imageSrc !== 'assets/Images/Assets/logo.jpg')
      this.imageSrc = 'assets/Images/Assets/logo.jpg';

    if (this.inputs.year !== '') {
      this.service.GetIPNos(this.inputs.year)
        .toPromise()
        .then(d => this.ipNos = d);
    }
    else
      this.ipNos = [];
  }

  GetPatientDetails(): void {
    this.inputs.xray = '';
    if (this.imageSrc !== 'assets/Images/Assets/logo.jpg')
      this.imageSrc = 'assets/Images/Assets/logo.jpg';

    if (this.inputs.year !== '' && this.inputs.ipNo !== '') {
      this.service.GetPatientDetails(this.inputs.year, this.inputs.ipNo)
        .toPromise()
        .then(d => {
          this.xrays = d.xrays;
          for (let obj in d.data)
            this.inputs[obj] = d.data[obj];
        });
    }
  }

  GetXRayImage(): void {
    if (this.inputs.year !== '' && this.inputs.ipNo !== '' && this.inputs.xray !== '') {
      this.service.GetXRayImage(this.inputs.year, this.inputs.ipNo, this.inputs.xray)
        .toPromise()
        .then(d => {
          this.imageSrc = d !== '' ? 'data:image/jpeg;base64,' + d : 'assets/Images/Assets/logo.jpg';
        });
    }
    else
      this.imageSrc = 'assets/Images/Assets/logo.jpg';
  }

  SelectFile(files: FileList) {
    if (files.length > 0) {
      this.file = files[0];
    }
    else
      this.file = null;
  }

  UploadFile(): void {
    if (this.inputs.year === '')
      this.toastr.error('Select the Year');
    else if (this.inputs.ipNo === '')
      this.toastr.error('Select the IP No');
    else if (this.inputs.xray === '')
      this.toastr.error('Select the XRay Name');
    else if (this.file === null)
      this.toastr.error('Select the Image to Upload');
    else {
      if (this.showUploadProgress === false) {
        this.subs = this.service.UploadXRayImage(this.inputs.year, this.inputs.ipNo, this.inputs.xray, this.file)
          .subscribe(
            {
              next: e => {
                this.showUploadProgress = true;
                if (e.type === HttpEventType.UploadProgress) {
                  this.uploadPercentage = Math.round(100 * (e.loaded / e.total));
                }
                else if (e.type === HttpEventType.Response) {
                  const reader = new FileReader();
                  reader.onload = () => this.imageSrc = reader.result;
                  reader.readAsDataURL(this.file);

                  this.showUploadProgress = false;
                  this.uploadPercentage = 0;
                  this.file = null;
                  this.renderer.selectRootElement('#file').value = '';
                  this.toastr.success('XRay Uploaded...');
                }
              },
              error: e => {
                this.showUploadProgress = false;
                this.toastr.error('An error Occured while Uploading the Image!!!');
              }
            });
      }
      else
        this.toastr.warning('An Image is already being Uploaded!!!', 'Multiple Works!!!');
    }
  }

  DownloadFile(): void {
    if (this.inputs.year === '')
      this.toastr.error('Select the Year');
    else if (this.inputs.ipNo === '')
      this.toastr.error('Select the IP No');
    else if (this.inputs.xray === '')
      this.toastr.error('Select the XRay Name');
    else {
      window.open(`${environment.normUrl}Downloads/XRay/${btoa(this.inputs.year)}/${btoa(this.inputs.ipNo)}/${btoa(this.inputs.xray)}`);
    }
  }

  DeleteFile() {
    if (this.inputs.year === '')
      this.toastr.error('Select the Year');
    else if (this.inputs.ipNo === '')
      this.toastr.error('Select the IP No');
    else if (this.inputs.xray === '')
      this.toastr.error('Select the XRay Name');
    else if (confirm('Do you want to Delete this XRay??')) {
      this.service.DeleteFile(this.inputs.year, this.inputs.ipNo, this.inputs.xray)
        .toPromise()
        .then(d => {
          if (d.status) {
            this.toastr.success(d.result);
            this.imageSrc = 'assets/Images/Assets/logo.jpg';
          }
          else
            this.toastr.warning(d.result);
        });
    }
  }

  ClearPage(): void {
    if (this.years.length > 0) {
      this.inputs.year = this.years[0];
      this.GetIPNos();
    }
    else
      this.ipNos = [];
    this.xrays = [];
    this.inputs.ipNo = this.inputs.name = this.inputs.age = this.inputs.gender = this.inputs.consultant = this.inputs.xray = '';
    this.renderer.selectRootElement('#file').value = '';
    this.imageSrc = 'assets/Images/Assets/logo.jpg';
  }

  ngOnDestroy(): void {
    if (this.subs !== null)
      this.subs.unsubscribe();
  }
}
