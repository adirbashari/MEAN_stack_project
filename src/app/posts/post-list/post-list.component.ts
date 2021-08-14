import { PostsService } from './../posts.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts:Post[]=[]
  private postsSub:Subscription;

  // postsService: PostsService from constructor
  constructor(public postsService: PostsService) { }

  ngOnInit(){
    this.postsService.getPosts();
    this.postsSub=this.postsService.getPostUpdateListener()
    .subscribe((posts:Post[])=>{
      this.posts = posts;
    });
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }
}
