import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TranslationService} from '../../../services/translation/translation.service';
import {Utils} from '../../../utils/utils';
import Helpers from '../../../helpers/helpers';

@Component({
  selector: 'app-translator-search-bar',
  templateUrl: './translator-search-bar.component.html',
  styleUrls: ['./translator-search-bar.component.scss']
})
export class TranslatorSearchBarComponent implements OnInit {

  isNumber = Utils.isNumber;
  fromLanguages;
  toLanguages;
  languages;
  loadingLanguages = true;
  userData;
  translatorForm: FormGroup;
  @Output() searchData = new EventEmitter();
  @Output() componentLoaded = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    private translationService: TranslationService,
    ) { }

  ngOnInit(): void {
    this.translatorForm = this.fb.group({
      Type: [''],
      fromLanguage: [''],
      toLanguage: [''],
      priceMin: [''],
      priceMax: [''],
      ownerId: ['']
    });
    this.userData = Helpers.getUserData();
    this.translationService.getAllLanguages().subscribe(res => {
      this.loadingLanguages = false;
      this.componentLoaded.emit('true');
      this.languages = res.items;
      this.fromLanguages = this.languages;
      this.toLanguages = this.languages;
    });
  }

  searchTranslationPackages() {
    const {Type, fromLanguage, toLanguage, ownerId} = this.translatorForm.value;
    let {priceMin, priceMax} = this.translatorForm.value;
    priceMin = priceMin ? priceMin.replace(/\,/g, '') : '';
    priceMax = priceMax ? priceMax.replace(/\,/g, '') : '';

    let PackageName =  `${fromLanguage} to ${toLanguage}`;
    PackageName = PackageName === ' to ' ? '' : PackageName;
    const data = {
      Type,
      OwnerId: ownerId,
      PackageName,
      Price: `${priceMin}-${priceMax}`,
    };
    this.searchData.emit(data);
  }

  selectedFromLanguage(language) {
    this.translatorForm.patchValue({fromLanguage: language});
    this.toLanguages = this.languages.filter(lang => lang.name !== language);
  }

  selectedToLanguage(language) {
    this.translatorForm.patchValue({toLanguage: language});
    this.fromLanguages = this.languages.filter(lang => lang.name !== language);
  }

  addCommas(value, inputField) {
    if (value === '') {
      this.translatorForm.patchValue({ [inputField]: value });
    } else {
      const num1 = value.replace(/,/g, '');
      const num2 = Number(num1).toLocaleString('en-US');
      this.translatorForm.patchValue({ [inputField]: num2 });
    }
  }

  isChecked(event) {
    if (event.checked) {
      this.translatorForm.patchValue({
        ownerId: this.userData.userId
      });
    } else {
      this.translatorForm.patchValue({
        ownerId: ''
      });
    }
  }
}
