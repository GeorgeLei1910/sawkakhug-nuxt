import { Component, OnInit } from '@angular/core';
import { Category } from 'src/shop-objects';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent implements OnInit {
  category: Category;

  constructor(category: Category) {
    this.category = category;
  }

  ngOnInit(): void {
  }

}
