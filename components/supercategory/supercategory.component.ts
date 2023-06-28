import { Component, OnInit, Input} from '@angular/core';
import { Category, SuperCategory } from 'src/shop-objects';
import { CategoryComponent } from '../category/category.component';
import { CategoryCardComponent } from '../category-card/category-card.component';

@Component({
  selector: 'app-supercategory',
  templateUrl: './supercategory.component.html',
  styleUrls: ['./supercategory.component.css']
})
export class SupercategoryComponent implements OnInit {

  superCategory: SuperCategory;
  categories: CategoryCardComponent[] = [];

  constructor(superCategory: SuperCategory) {
    this.superCategory = superCategory;
    superCategory.categories.forEach(element => {
      this.categories.push(new CategoryCardComponent(element));
    });
  }

  ngOnInit(): void {
  }

}
