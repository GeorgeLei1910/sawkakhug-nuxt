import { Component, OnInit } from '@angular/core';
import { Item } from 'src/shop-objects';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  item: Item;

  constructor(item : Item) {
    this.item = item;
  }

  ngOnInit(): void {
  }

}
