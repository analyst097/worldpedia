import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Country } from 'src/app/models/models';
import { CountryService } from 'src/app/services/country.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {

  @ViewChild('dialog') dialog?: TemplateRef<any>;

  allCountries: Country[] = [];
  countryList: Country[] = [];
  shownCountries = 5;
  isFetching = true;
  searchText = '';
  isSearching = false;
  clickedCountry?: Country;
  ObjectRef = Object;

  constructor(
    private matDialog: MatDialog,
    private countryService: CountryService) {}

  ngOnInit(): void {
    this.fetchCountries();
  }

  showMore() {
    this.shownCountries += 5;
    this.countryList = this.allCountries.slice(0, this.shownCountries);
  }

  fetchCountries() {
    this.countryService.getAllCountries().subscribe(
      (res) => {
        this.allCountries = res.sort((a, b) => {
          if (a.name.official > b.name.official) return 1;
          else return -1;
        });

        this.countryList = this.allCountries.slice(0, this.shownCountries);
        this.isFetching = false;
      },
      (error) => {
        //todo show error message in UI
      }
    );
  }

  showDialog(country: Country, element: TemplateRef<MatDialog>){
    this.clickedCountry = country;
    this.matDialog.open(element);
    
  }

  onSearch() {
    if (this.searchText) {
      this.countryService.searchByName(this.searchText).subscribe((res) => {
        this.shownCountries = 5;
        this.allCountries = res;
        this.countryList = this.allCountries.slice(0, this.shownCountries);
        this.isSearching = false;
      });
    } else {
      this.shownCountries = 5;
      this.fetchCountries();
    }
  }
}
