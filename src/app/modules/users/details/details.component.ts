import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule, MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';

import { FuseAlertComponent, FuseAlertService, FuseAlertType } from '@fuse/components/alert';
import { BehaviorSubject, Observable, Subject, forkJoin, map, min, startWith, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CustomMaskDirective } from 'app/directives/mask-format/mask-format.directive';
import { SharedModule } from 'app/shared/shared.module';
import { UserService } from 'app/core/user/user.service';
import { UtilsService } from 'app/services/utils';

import { ImageDialogComponent } from 'app/shared/image-dialog/image-dialog.component';
import { User } from 'app/models/user';
import { PropertiesService } from 'app/services/api/properties.service';
import { Properties } from 'app/models/properties';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  standalone: true,
  imports: [SharedModule, RouterLink, ReactiveFormsModule, MatButtonModule, MatIconModule, MatOptionModule, MatNativeDateModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule, MatCheckboxModule, MatDatepickerModule, CustomMaskDirective, MatAutocompleteModule],
})
export class DetailsUserComponent implements OnInit, OnDestroy {

  title: string;
  //User: string;
  pfl: string;
  UserForm: FormGroup;

  User: User[] = [];
  Profiles: Properties[] = [];
  private resolveUser: User;
  private _object: User;
  private userLogged: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  insertUpdate: boolean;
  disableSave: boolean = false;
  isNit: boolean = false;
  isGenerador: boolean;

  //filteredOptionsCarMarks: Observable<PCarMark[]>  

  /**
    * Constructor
    */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _utilS: UtilsService,
    private _toastService: ToastrService,
    private _userService: UserService,
    private _propertyService: PropertiesService,
    public dialog: MatDialog,

  ) {

    this._object = new User();
    this.userLogged = this._userService.getUserSysten();
    this.pfl = this._userService.getTypeProfile();
    const currentYear = new Date().getFullYear();
  }

  /**
   * On init
   */
  ngOnInit(): void {

    // Create the form
    this.UserForm = this.initUserForm();

    /* this.trailerForm.get('trailer_placa').valueChanges.pipe()
      .subscribe(value => {

        if (value.length >= 6) 
        {
          this.changePlacaTrailer()
        }

      }) */

    // Load necesary data
    this.loadData();

  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------


  uploadFile(fileList: FileList, doc: string): void {

    const maxSize = 2 * 1024 * 1024; // Tamaño máximo en bytes (2 MB)

    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    const file = fileList[0];

    // Return if canceled
    if (!fileList.length) {
      this._toastService.error('No se pudo leer el archivo', 'Documento', { closeButton: true, progressBar: true });
      return;
    }
    // Return if the file is not allowed
    if (!allowedTypes.includes(file.type)) {
      this._toastService.error('Formato no permitido', 'Documento', { closeButton: true, progressBar: true });
      return;
    }
    // returns if the file size is larger than allowed
    if (file.size > maxSize) {
      this._toastService.error('El archivo no debe superar 2MB', 'Documento', { closeButton: true, progressBar: true });
      return;
    }

    this._readAsDataURL(file).then((data) => {
      switch (doc) {

        // Docs for trailer
        case 'trailer_image':
          this.UserForm.get(doc).patchValue(file.name);
          //this._object.trailerimage_B64 = data;
          break;

        default:
          break;
      }
    });
  }

  submit(): void {

    // Update validators and validity of 'license' group controls
    this.UserForm.updateValueAndValidity();

    if (this.UserForm.invalid) {
      this._toastService.warning('Hay campos obligatiorios vacios', 'Usuario', { closeButton: true, progressBar: true });

      Object.keys(this.UserForm.controls).forEach((controlName) => {

        this.UserForm.get(controlName)?.markAsTouched();
      });

      return;
    }

    // data from form
    this._object.profile_id  = this.UserForm.get('profile').value;
    this._object.docid       = this.UserForm.get('num_doc').value;
    //this._object.name       = this.UserForm.get('name').value.toUpperCase;
    this._object.celular     = this.UserForm.get('celular').value;
    this._object.email       = this.UserForm.get('email').value;

    const dv = this._utilS.verificationDigit(this._object.docid.toString());
    this._object.dv = dv;

    

  }

  seeImage(fileList: FileList, doc: string): void {

    const file = fileList[0];

    if (file == undefined) 
    {
      switch (doc) {
        // Trailer images
        case 'trailer_image':
          //this.openDialogImage(this._object.trailerimage)
          break;

        default:
          break;
      }
    } else {
      if (fileList.length == 0) {
        return;
      }

      this._readAsDataURL(file).then((data) => {

        if (data) this.openDialogImage(data);
      });
    }
  }

  openDialogImage(url: string): void {

    if (url) 
    {
      this.dialog.open(ImageDialogComponent, {

        data: {
          url_image: url,
        },
        width: '100%'

      });
    }
  }

  changeThird(event: any): void {

    const document = this.UserForm.get('doc_third').value;

    if (document.toString().length <= 3) 
      {
        return;
      }
    
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  private loadData() {
    
    this.loadProfilesuser();

    this.route.queryParams.subscribe(param => {

      if (param.new == 0) 
      {
        this.insertUpdate = true;

        this.title = "Editar Usuario";

        this.resolveUser = this.route.snapshot.data.user.object;

        this._object = this.resolveUser;

        this.UserForm.get('num_doc').disable({ onlySelf: true, emitEvent: false });

        this.fillUserForm();

      } else if (param.new == 1) 
      {
        this.insertUpdate = false;
        
        this.title = "Crear Usuario"
        
        this.UserForm.get('profile').patchValue(4);
        
        this.UserForm.get('doc_type').patchValue(1);

        if (this.pfl == "Customer") 
        {
          this._object.third_id = this.userLogged.third;

          this.UserForm.get('profile').disable({ onlySelf: true, emitEvent: false });

          this.UserForm.get('doc_third').disable({ onlySelf: true, emitEvent: false });
          
          this.UserForm.get('doc_third').patchValue(this.userLogged.doc);
          
          this.UserForm.get('name_third').patchValue(this.userLogged.name);
        } 

      }
    });

  }

  /**
   * Build the form
   */
  private initUserForm(): FormGroup {
    // Create the trailer form
    return this.fb.group({

      profile:             ['', [Validators.required]],
      doc_type:            ['', [Validators.required]],
      num_doc:             ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(4), Validators.maxLength(15)]],
      celular:             ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(10)]],
      email:               ['', [Validators.required, Validators.email]],
      name:                [{value: '', disabled: true}, []],
      doc_third:           ['', [Validators.required]],
      name_third:          [{value: '', disabled: true}, [Validators.required]],
      

      //trailer_back_image:    ['', []],


    });
  }

  private fillUserForm() {

    //this.trailerForm.get('trailer_placa').patchValue(this._object.placa, { emitEvent: false });
    this.UserForm.get('profile').patchValue(this._object.profile_id);
    this.UserForm.get('num_doc').patchValue(this._object.docid);
    this.UserForm.get('celular').patchValue(this._object.celular);
    this.UserForm.get('email').patchValue(this._object.email);

  }


  /**
   * Read the given file for demonstration purposes
   *
   * @param file
   */
  private _readAsDataURL(file: File): Promise<any> {
    // Return a new promise
    return new Promise((resolve, reject) => {
      // Create a new reader
      const reader = new FileReader();

      // Resolve the promise on success
      reader.onload = (): void => {
        resolve(reader.result);
      };

      // Reject the promise on error
      reader.onerror = (e): void => {
        reject(e);
      };

      // Read the file as the
      reader.readAsDataURL(file);
    });
  }

  private save(): void {

    this._userService.emailexist(this._object).pipe()
    .subscribe(data => {

      if (!data.success) 
      {
        this._userService.docexist(this._object).pipe()
        .subscribe(data => {

          if (!data.success) 
          {
            this._userService.create(this._object).pipe()
            .subscribe(data => {
              
              if (data.success) 
              {
                this._toastService.success(data.message, 'Crear Tercero', { closeButton: true, progressBar: true });
                
                this.sendPass();
                
                this.disableSave = false;
                
                this.router.navigate(['../'], {relativeTo: this.route});
                
              } else
              {
                this._toastService.error(data.message, 'Crear Tercero', { closeButton: true, progressBar: true });
                
                this.disableSave = false;
              }
            })
            
          } else
          {
            this._toastService.error(data.message, 'Documento Tercero', { closeButton: true, progressBar: true });
            
            this.disableSave = false;
          }
        })
        
      } else
      {
        this.disableSave = false;

        this._toastService.error(data.message, 'Correro Tercero', { closeButton: true, progressBar: true });
      }
    });
  }

  private update(): void {

    this.disableSave = true;

    this._userService.update(this._object)
      .subscribe(data => {

        if (data.success) 
        {
          this._toastService.success(data.message, 'Trailer', { closeButton: true, progressBar: true });

          this.disableSave = false;

          this.router.navigate(['../'], { relativeTo: this.route });

        } else 
        {
          this._toastService.error(data.message, 'Trailer', { closeButton: true, progressBar: true });

          this.disableSave = false;
        }
      })
  }



  private loadProfilesuser(): void {
    this._propertyService.getAllByProfile().pipe(takeUntil(this._unsubscribeAll))
    .subscribe(data => {

      if (data.success) 
      {
        this.Profiles = data.object;
        
      } else 
      {
        this._toastService.error(data.message, '', { closeButton: true, progressBar: true });
      }
    })
  }


  private sendPass(): void {
    this._userService.sendmailpass(this._object).pipe()
    .subscribe(data => {
      if (data.success) 
      {
        this._toastService.success('Se ha enviado un correo con la contraseña al usuario', 'Clave', { closeButton: true, progressBar: true });  
      } else {
        
      }
    })

  }


}



