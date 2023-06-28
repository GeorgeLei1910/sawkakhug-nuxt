import { Component } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Category } from 'src/shop-objects';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  category: Category;
  products: ProductCardComponent[] = [];

  constructor(category: Category){
    this.category = category;
    this.category.items.forEach(item => {
      this.products.push(new ProductCardComponent(item));
    })
  }
}
