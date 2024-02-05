import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Menuitem } from '../../Models/menuitem';
import { Restaurant } from '../../Models/restaurant';
import { Res } from '../../Models/res';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css'],
  imports: [FormsModule, CommonModule, HttpClientModule],
})
export class MenuListComponent {
  rid?:number;
  rname?:string;
  selectedRestaurant:Res;
  menuItems: Menuitem[] = [];
  filteredMenuItems: Menuitem[] = [];
  quantityOptions: number[] = [1, 2, 3];

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe((p)=>(this.rid=p['rid']));
    console.log(this.rid);
    this.selectedRestaurant=new Res();
    this.http.get<Res>('http://localhost:5145/api/Restaurant/'+this.rid).subscribe(
        (response) => {
          console.log(response);
          this.selectedRestaurant=response;
          this.rname=this.selectedRestaurant.name;
          console.log(this.rname);

          this.getFilteredMenuItems();
          });
    
  }

  getFilteredMenuItems() {
    console.log(this.selectedRestaurant);
    if (this.selectedRestaurant) {
      this.http.get<Menuitem[]>(`http://localhost:5145/api/MenuItem/ByRestaurant/${encodeURIComponent(this.rname || '')}`).subscribe(
        (response) => {
          this.menuItems = response.map((menuItem) => ({
            name: menuItem.name,
            description: menuItem.description,
            price: menuItem.price,
            menuItemId: menuItem.menuItemId,
            quantity: menuItem.quantity,
            image: menuItem.image
          }));
          console.log('Fetched Menu Items:', this.menuItems);
          this.filteredMenuItems = this.menuItems;
        },
        (error) => {
          console.error('Error fetching menu items by restaurant from API', error);
        }
      );
    }
  }

  getRestaurantImage(m:any) {
    console.log(m)
    // Replace 'http://localhost:5145/Resources/Images/' with the actual base URL for restaurant images
    return `http://localhost:5145/Resources/Images/${m}.jpg`;
  }

  addToOrder(menuItem: Menuitem) {
    // Implement your logic for adding to order
  }

  navigateToOrderList() {''
    this.router.navigate(['/order-list']);
  }
}