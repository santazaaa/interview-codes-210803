import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loading = true;
  list: string[] = [];
  filteredList: string[] = [];
  filter = '';

  ngOnInit(): void {
   this.getData(); 
  }

  getData() {
    this.loading = true;
    fetch('https://api.publicapis.org/categories')
      .then(body => body.json())
      .then(result => {
        this.list = result;
        this.updateFilter();
        this.loading = false;
      })
      .catch(err => {
        alert('Failed to fetch the data. Please refresh to try again.');
      });
  }

  updateFilter() {
    const searchTerm = this.filter.toLowerCase().trim();
    if (!searchTerm) {
      this.filteredList = this.list;
    } else {
      this.filteredList = this.list.filter(item => item.toLowerCase().includes(searchTerm));
    }
  }
}
