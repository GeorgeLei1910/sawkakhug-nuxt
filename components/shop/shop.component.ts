import { Component, OnInit } from '@angular/core';
import { SuperCategory } from 'src/shop-objects';
import { SupercategoryComponent } from '../supercategory/supercategory.component';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  components: SupercategoryComponent[] = [];
  superCategories: SuperCategory[] = [
    {
      id : "TNG",
      title : "TestNagu",
      desc : "Wanna test this out",
      categories : [{
        id: "TMNIOJIJPBDUHPIUJ",
        color: "8800BB",
        desc: "Testing this thing lorem ipsum has got nothing on me",
        items: [],
        title: "TWonuggu",
        picture : "../assets/images/Tsunagu.jpg"
      }]
  }];

  constructor() {
  }

  ngOnInit(): void {
    this.superCategories.forEach(element => {
      console.log(element);
      this.components.push(new SupercategoryComponent(element));
    })
  }

}
