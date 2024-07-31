import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Mahesh Chaurasiya';
  accessKey: string = '0n0O_ApQ4_4lZ_K4WDNq0N3C5XWq4tM-rmT9hTZ-jHE';
  
  @ViewChild('showMoreButton') showMoreButton!: ElementRef;
  @ViewChild('searchResult') searchResult!:ElementRef;
  showMore: HTMLElement = document.querySelector('.show-more') as HTMLElement;
  a: HTMLHeadingElement = document.createElement('h1');

  inputData: string = '';
  page: number = 1;

  constructor() {
    this.a.innerHTML = 'Loading.....';
    this.a.style.display = 'none';
  }
  ngAfterViewChecked(){
    this.searchResult.nativeElement.appendChild(this.a);
  }
  async searchImages(): Promise<void> {
    const url: string = `https://api.unsplash.com/search/photos?page=${this.page}&query=${this.inputData}&client_id=${this.accessKey}`;
    this.a.style.display = 'block';
    const response: Response = await fetch(url);
    const data: any = await response.json();
    this.a.style.display = 'none';
    this.searchResult.nativeElement.innerHTML = '';

    const result: any[] = data.results;

    if (this.page === 1) {
      this.searchResult.nativeElement.innerHTML = '';
    }

    result.map((result: any) => {
      const imagewrapper: HTMLDivElement = document.createElement('div');
      imagewrapper.classList.add('search-result');
      const image: HTMLImageElement = document.createElement('img');
      image.src = result.urls.small;
      image.alt = result.alt_description;
      const imageLink: HTMLAnchorElement = document.createElement('a');
      imageLink.href = result.links.html;
      imageLink.target = '_blank';
      imageLink.textContent = result.alt_description;

      imagewrapper.appendChild(image);
      imagewrapper.appendChild(imageLink);
      this.searchResult.nativeElement.appendChild(imagewrapper);
    });

    if (result.length > 0) {
      // If there are results, increment the page
      this.page++;
      // Show the "show more" button
      this.showMoreButton.nativeElement.style.display = 'block';
    } else {
      // If there are no more results, hide the "show more" button
      this.showMoreButton.nativeElement.style.display = 'none';
    }
  
    
  }
  
  onSubmit(e:any){
    this.inputData = e.target[0].value;
    this.page = 1;
    this.searchImages();
  }
  showMoreFun(){
    this.searchImages();
  }
}
