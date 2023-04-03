import { Component, OnInit, Inject } from '@angular/core';
import { slideToTop } from 'src/app/router.animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { GridLayoutRetEntity } from '../../entity';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmacaoService } from '../../shared';

@Component({
  selector: 'app-dragdrop',
  templateUrl: './dragdrop.component.html',
  styleUrls: ['./dragdrop.component.scss'],
  animations: [slideToTop()]
})
export class DragdropComponent implements OnInit {
  todo = Array<GridLayoutRetEntity>();
  done = Array<GridLayoutRetEntity>();
  registerForm: FormGroup;
  Disable: boolean = true;

  constructor(public dialogRef: MatDialogRef<DragdropComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(FormBuilder) public formBuilder: FormBuilder,
    @Inject(ConfirmacaoService) public confirmationDialogService: ConfirmacaoService) {
    this.done = data.ColunasTot;
    this.todo = data.ColunasDisp;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      Nome: ['']
    });
  }

  SitBtn() {
    if (this.registerForm.controls.Nome.value !== '') {
      this.Disable = false;
    } else {
      this.Disable = true;
    }
  }

  Salvar() {
    this.confirmationDialogService.confirm('TitlePopSalvar', 'MsgSalvar')
      .then((confirmed) => {
        if (confirmed) {
          let NomeLayout = this.registerForm.controls.Nome.value;

          if (NomeLayout === '') {
            NomeLayout = this.data.NmLayout;
          }
          this.dialogRef.close({ Dados: this.done, Nome: NomeLayout });
        }
      });

  }

  Excluir() {
    this.confirmationDialogService.confirm('TitlePopExcluir', 'MsgExcluir')
      .then((confirmed) => {
        if (confirmed) {
          this.dialogRef.close({ Dados: this.done, Id: this.data.IdLayout, Acao: 'E' });
        }
      });

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}
