import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOptionModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatSnackBarModule, DateAdapter} from '@angular/material';
import {MatInputModule, MatCheckboxModule, MatRadioModule, MatTableModule,MatAutocompleteModule,MatPaginatorModule} from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';

import { AppComponent } from './app.component';
import { ContactDetailsComponent } from './Components/contact-details/contact-details.component';
import { ContactCardComponent } from './Components/contact-card/contact-card.component';
import { ContactListComponent } from './Components/contact-list/contact-list.component';
import { ContactLineComponent } from './Components/contact-line/contact-line.component';
import { AddContactServerService } from './Services/add-contact-server.service';
import { DeleteDialogComponent } from './Components/delete-dialog/delete-dialog.component';
import { DatePickerModule, CustomDateAdapter } from './Classes/DateAdapter';
import { UploadDialogComponent } from './Components/upload-dialog/upload-dialog.component';
import { SnackBarComponent } from './Components/snack-bar/snack-bar.component';
import { ImportDialogComponent } from './Components/import-dialog/import-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactDetailsComponent,
    ContactCardComponent,
    ContactListComponent,
    ContactLineComponent,
    DeleteDialogComponent,
    UploadDialogComponent,
    SnackBarComponent,
    ImportDialogComponent
  ],
  entryComponents: [
    ContactDetailsComponent,
    ContactCardComponent,
    DeleteDialogComponent,
    ImportDialogComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    FormsModule,
    DatePickerModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatRadioModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    DatePickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
  ],
  providers: [AddContactServerService ,CustomDateAdapter],
  bootstrap: [AppComponent]
})
export class AppModule { }
