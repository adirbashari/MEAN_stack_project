import { PostsService } from './../posts.service';
import { Component} from '@angular/core'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl:'./post-create.component.html',
  styleUrls:['post-create.component.css']
})
export class PostCreateComponent{
enteredTitle='';
enteredContent='';

constructor(public postsServices: PostsService){}


onAddPost(form:NgForm){
  if( form.invalid){
    return;
  }
this.postsServices.addPost(form.value.title,form.value.content);
form.resetForm();

}



}
