import { Component, inject } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ArticlesService } from '../../services/articles.service';
import { ArticleDto, NewArticleDto } from '../../models/article.model';

@Component({
  selector: 'app-editor',
  standalone: true,
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule],
})
export class EditorComponent {
  formGrp: FormGroup;

  articleServices = inject(ArticlesService);

  constructor(fb: FormBuilder) {
    this.formGrp = fb.nonNullable.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      body: ['', Validators.required],
      tagList: fb.array([]),
    });
  }

  onCreateNewPost(): void {
    
    const newArticle: NewArticleDto={
        ...this.formGrp.value
    }
    this.articleServices.postNewArticle(newArticle).subscribe(res=>{
        console.log(res);
    })
  }
}
