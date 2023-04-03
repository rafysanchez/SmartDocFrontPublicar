import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import { Component, OnInit, NgZone, OnDestroy, Inject, ViewChild } from '@angular/core';
import {take} from 'rxjs/operators';

import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { slideToTop } from 'src/app/router.animations';


import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-manifestacao',
  templateUrl: './manifestacao.component.html',
  styleUrls: ['./manifestacao.component.scss'],
  animations: [slideToTop()]
})
export class ManifestacaoComponent implements OnInit, OnDestroy {

  @ViewChild('autosize', { static: true }) autosize: CdkTextareaAutosize;
  manifestForm: FormGroup;

  get f() { return this.manifestForm.controls; }


  constructor(public dialogRef: MatDialogRef<ManifestacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(FormBuilder) public formBuilder: FormBuilder, private _ngZone: NgZone) {

  }

  ngOnInit() {

    this.manifestForm = this.formBuilder.group({
      WEBSE: [''],

    });

  }

  ngOnDestroy(): void {}


  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  Limpar() {
    this.manifestForm.controls.WEBSE.setValue('');

    Object.keys(this.manifestForm.controls).forEach(key => {
      this.manifestForm.controls[key].setErrors(null);
    });

  }

  onNoClick(): void {
    this.dialogRef.close('cancelou');
  }

  onConfirmar():void{

    this.dialogRef.close(this.manifestForm.value);
  }

}
