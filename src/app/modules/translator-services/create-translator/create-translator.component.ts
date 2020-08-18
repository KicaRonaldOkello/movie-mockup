import { Component, OnInit } from '@angular/core';
import {ShareDataService} from '../../../services/share-data/share-data.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import Helpers from '../../../helpers/helpers';
import {TranslationService} from '../../../services/translation/translation.service';
import {ToursService} from '../../../services/tours/tours.service';
import {Utils} from '../../../utils/utils';
import {environment} from '../../../../environments/environment';
import * as moment from 'moment';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';

declare var cloudinary: any;
@Component({
  selector: 'app-create-translator',
  templateUrl: './create-translator.component.html',
  styleUrls: ['./create-translator.component.scss']
})
export class CreateTranslatorComponent implements OnInit {

  package;
  coverImage;
  supportedCurrencies;
  userData;
  params;
  isCreatingPackage = true;
  languages;
  isNumber = Utils.isNumber;
  fromLanguages;
  toLanguages;
  fromLanguageError = false;
  toLanguageError = false;
  isAudioNotOffered = false;
  isVideoNotOffered = false;
  isLiveNotOffered = false;
  isTextNotOffered = false;
  submittingTranslator = false;
  loadingLanguages = true;
  loadingCurrencyCode = true;
  loadingProfileImage = true;
  createTranslatorForm: FormGroup;
  constructor(
    private shareDataService: ShareDataService,
    private toursService: ToursService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private translationService: TranslationService,
    private fb: FormBuilder
  ) {
    this.shareDataService.showAd('true');
    this.userData = Helpers.getUserData();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.params = params.id;
    });

    this.createTranslatorForm = this.fb.group({
      dateOfBirth: [''],
      translatorName: [''],
      bio: [''],
      audioTranslationPrice: [''],
      videoTranslationPrice: [''],
      textTranslationPrice: [''],
      liveTranslationPrice: [''],
      ownerId: [''],
      currencyCode: [''],
      fromLanguage: [''],
      toLanguage: ['']
    });

    this.coverImage = this.userData.profilePicUrl;
    this.createTranslatorForm.patchValue({translatorName: this.userData.name});
    this.createTranslatorForm.get('translatorName').disable();
    this.translationService.getAllLanguages().subscribe(res => {
      !this.params ? this.loadingLanguages = false: null;
      this.languages = res.items;
      this.fromLanguages = this.languages;
      this.toLanguages = this.languages;
      this.params ? this.getTranslationPackage(this.params) : null;
    });

    this.getSupportedCurrencies();
  }

  getSupportedCurrencies() {
    this.toursService.getAllSupportedCurrencies().subscribe(res => {
      this.loadingCurrencyCode = false;
      this.supportedCurrencies = res.supportedCurrencies;
    });
  }

  selectedFromLanguage(language) {
    this.createTranslatorForm.patchValue({fromLanguage: language});
    this.fromLanguageError = false;
    this.toLanguages = this.languages.filter(lang => lang.name !== language);
  }

  selectedToLanguage(language) {
    this.createTranslatorForm.patchValue({toLanguage: language});
    this.toLanguageError = false;
    this.fromLanguages = this.languages.filter(lang => lang.name !== language);
  }

  isChecked(event, disableKey, formKey) {
    this[disableKey] = event.checked;
    this[disableKey] ? this.createTranslatorForm.get(formKey).reset() : null;
    this[disableKey] ? this.createTranslatorForm.get(formKey).disable() :
      this.createTranslatorForm.get(formKey).enable();
  }

  addCommas(value, inputField) {
    if (value === '') {
      this.createTranslatorForm.patchValue({ [inputField]: value });
    } else {
      const num1 = value.replace(/,/g, '');
      const num2 = Number(num1).toLocaleString('en-US');
      this.createTranslatorForm.patchValue({ [inputField]: num2 });
    }
  }

  upload() {
    const myWidget = cloudinary.createUploadWidget({
        cloudName: 'do6g6dwlz',
        uploadPreset: 'vdoc0rsk',
        maxImageFileSize: environment.maxImageFileSize,
        multiple: false}, (error, result) => {
        if (!error && result && result.event === 'success') {
          this.coverImage = result.info.secure_url;
        }
      }
    );

    myWidget.open();
  }

  ensureLanguagesChosen() {
    const {fromLanguage, toLanguage, } = this.createTranslatorForm.value;
    if (fromLanguage && toLanguage) {
      this.submitData();
    } else {
      if (!fromLanguage) {
        this.fromLanguageError = true;
      }
      if (!toLanguage) {
        this.toLanguageError = true;
      }
    }
  }

  submitData() {
    this.submittingTranslator = true;
    const {fromLanguage, toLanguage, bio, currencyCode, dateOfBirth} = this.createTranslatorForm.value;
    const data = {
      id: this.isCreatingPackage ? 0 : this.params,
      coverImageUrl: this.coverImage,
      packageName: `${fromLanguage} to ${toLanguage}`,
      bio,
      ownerId: this.userData.userId,
      currencyCode,
      ownerName: this.userData.name,
      dateOfBirth: dateOfBirth ? moment(dateOfBirth).format('DD/MM/YYYY') : '',
      audioTranslationPrice: this.processTranslationTypes('isAudioNotOffered', 'audioTranslationPrice'),
      videoTranslationPrice: this.processTranslationTypes('isVideoNotOffered', 'videoTranslationPrice'),
      textTranslationPrice: this.processTranslationTypes('isTextNotOffered', 'textTranslationPrice'),
      liveTranslationPrice: this.processTranslationTypes('isLiveNotOffered', 'liveTranslationPrice'),
    };
    this.translationService.createTranslator(data).subscribe(res => {
      this.submittingTranslator = false;
      const message = this.isCreatingPackage ? 'Translator created successfully.' : 'Translator edited successfully.';
      if (res.statusDesc === 'SUCCESS') {
        this.router.navigateByUrl('/translation');
        this.snackBar.open(message, '', {
          duration: 5000,
          panelClass: ['green-snackbar']
        });
      } else {
        this.snackBar.open(res.statusDesc, '', {
          duration: 6000,
          panelClass: ['red-snackbar']
        });
      }
    });
  }

  processTranslationTypes(isNotOffered, formKey) {

    if (this[isNotOffered]) {
      return 'NOT_OFFERED';
    } else {
      const amount = this.createTranslatorForm.get(formKey).value;
      if (amount) {
        return amount.replace(/\,/g, '');
      } else {
        return amount;
      }
    }
  }

  getTranslationPackage(id) {
    this.translationService.getTranslatorPackage(id).subscribe(res => {
      this.isCreatingPackage = false;
      this.loadingLanguages = false;
      this.package = res;
      const languages = res.packageName.split(' ');
      this.selectedFromLanguage(languages[0]);
      this.selectedToLanguage(languages[2]);
      this.coverImage = res.coverImageUrl;
      this.createTranslatorForm.patchValue({
        dateOfBirth: moment(res.dateOfBirth, 'DD/MM/YYYY').toDate(),
        bio: res.bio,
        currencyCode: res.currencyCode
      });
      this.patchTranslationTypes(res.audioTranslationPrice, 'isAudioNotOffered', 'audioTranslationPrice');
      this.patchTranslationTypes(res.videoTranslationPrice, 'isVideoNotOffered', 'videoTranslationPrice');
      this.patchTranslationTypes(res.textTranslationPrice, 'isTextNotOffered', 'textTranslationPrice');
      this.patchTranslationTypes(res.liveTranslationPrice, 'isLiveNotOffered', 'liveTranslationPrice');
    });
  }

  patchTranslationTypes(value, isNotOffered, formKey) {
    if (value === 'NOT_OFFERED') {
      this[isNotOffered] = true;
      this.createTranslatorForm.get(formKey).disable();
    } else {
      this.createTranslatorForm.patchValue({
        [formKey]: Number(value).toLocaleString('en-US')
      });
    }
  }
}
