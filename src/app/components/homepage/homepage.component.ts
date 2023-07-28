import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {

    this.countryService.getAllCountries().subscribe(res =>{
      console.log(res);
    })
  }

}
