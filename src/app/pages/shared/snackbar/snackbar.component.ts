/**
 * @description Snack bar de mensagens
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */
import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {
  Mensagem: string;
  constructor(public snackBarRef: MatSnackBarRef<SnackbarComponent>,
              @Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit() {
  }


}
