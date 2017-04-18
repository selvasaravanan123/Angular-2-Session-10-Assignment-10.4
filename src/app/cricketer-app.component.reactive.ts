import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { CricketerService } from 'app/services/cricketer.service';
import { ICricketList, ICricketerModel } from './interface/cricketer-list';
import { IPlayerType } from 'app/interface/player-type';
import { CriketerDropDownService } from 'app/services/criketer-drop-down.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

declare const alertify: any;

@Component({
  selector: 'app-root',
  templateUrl: './cricketer-app.component.reactive.html',
  styleUrls: ['./cricketer-app.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [CricketerService]
})

export class AppComponent implements OnInit {
  /**Public variable */
  cricketersArray: ICricketList[] = [];
  playerType: IPlayerType[] = [];

  cricketerModel: ICricketerModel;
  cricketerDetail: ICricketList;


  /**Declaring myForm of Type FormGroup */
  myForm: FormGroup;

  /**explicitly declaring lastName */
  lastName = new FormControl('', [Validators.pattern('^[a-zA-Z]*$'), Validators.required, Validators.minLength(2)]);


  // Using constructor, call the cricketService.
  // this shorthand syntax automatically creates and
  // initializes a new private member in the class
  constructor(private _cricketService: CricketerService, private _cricketerDropDown: CriketerDropDownService, private fb: FormBuilder) { }

  ngOnInit() {

    /**
     * Using Form Group
     * Creating Instance of FromGroup and passing object
     * with key value pair for the form. */
    // this.myForm = new FormGroup({
    //   firstName: new FormControl(''),
    //   lastName : this.lastName
    // });

    /**Using FormBuilder*/
    this.myForm = this.fb.group({
      'firstName': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'lastName': this.lastName,
      'favShot': 'Hook',
      'playerType': [, Validators.required]
    });

    /**SetValue */
    // this.myForm.setValue({
    //   'firstName': 'Sachin',
    //   'lastName': 'Tendulkar',
    //   'favShot': 'Long Drive',
    //   'playerType': 'Batsman'
    // });

    /**Patch Value */
    // this.myForm.patchValue({
    //   'firstName': 'Sachin',
    //   'lastName': 'Tendulkar',
    //   'favShot': 'Long Drive',
    // });

    this.playerType = this._cricketerDropDown.getPlayerType();
  }

  /**Reset a form */
  resetForm() {
    this.myForm.reset();
  };

  /**Add a cricket */
  addCriketer(values) {

    this.cricketerDetail = {
      firstName: values.firstName,
      lastName: values.lastName,
      favShot: values.favShot,
      batsmanBowler: values.playerType
    };
    // /**Call function from service. */
    this._cricketService.addCricketer(this.cricketerDetail);
    // Using 3rd party library to show message.
    alertify.notify('Cricketer Added Successfully', 'success', 3);

    this.cricketersArray = this._cricketService.getCricket();
  }

}
