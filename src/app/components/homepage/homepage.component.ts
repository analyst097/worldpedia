import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Country } from 'src/app/models/models';
import { CountryService } from 'src/app/services/country.service';
import {MatDialog} from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {

  @ViewChild('dialog') dialog?: TemplateRef<any>;

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  allCountries: Country[] = [];
  countryList: Country[] = [];
  shownCountries = 20;
  isFetching = true;
  searchText = '';
  isSearching = false;
  clickedCountry?: Country;
  errorMsg = '';

  constructor(
    private matDialog: MatDialog,
    private _snackBar: MatSnackBar,
    private countryService: CountryService) {}

  ngOnInit(): void {
    this.fetchCountries();
  }

  showMore() {
    this.shownCountries += 20;
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
        this.errorMsg  = '';
      },
      (error) => {
        this.isFetching = false;
        this.errorMsg = 'Some error occurred while fetching. Please try again.'
      }
    );
  }

  showDialog(country: Country, element: TemplateRef<MatDialog>){
    this.clickedCountry = country;
    this.matDialog.open(element);
    
  }

  onSearch() {
    if (this.searchText) {
      this.isSearching = true;
      this.countryService.searchByName(this.searchText).subscribe((res) => {
        this.shownCountries = 20;
        this.allCountries = res;
        this.countryList = this.allCountries.slice(0, this.shownCountries);
        this.isSearching = false;
        this.errorMsg  = '';
      }, (error) =>{
        this.isSearching = false;
        this.countryList = [];
        if(error.status === 404){
          this.openSnackBar('No country found');
        } else{
          this.errorMsg = 'Some error occurred while searching for country. Please try again.'; 
        }
      });
    } else {
      this.shownCountries = 20;
      this.fetchCountries();
    }
  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    });
  }

  onClickSearch(){
    if(!this.searchText){
      this.shownCountries = 20;
      this.fetchCountries();
    }
  }
}
