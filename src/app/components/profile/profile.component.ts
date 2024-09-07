import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  // ngOnInit(): void {
  //   if (isPlatformBrowser(this.platformId)) {
  //     this.username = localStorage.getItem('username') || '';
  //     this.route.paramMap.subscribe(params => {
  //       this.username = params.get('username') || this.username;
  //       this.xService.getUserPosts(this.username).subscribe(x => {
  //         this.xList = x;
  //       }, error => {
  //         console.error('Failed to load user posts:', error);
  //         if (error.status === 404) {
  //           console.error('Endpoint not found');
  //         }
  //       });
  //     });
  //   }
  // }
}
