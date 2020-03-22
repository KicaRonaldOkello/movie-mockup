import { Component, OnInit, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GetBlogsService } from 'src/app/services/blog/get-blogs.service';
import { MatSnackBar } from '@angular/material/snack-bar';

declare var cloudinary: any
@Component({
  selector: 'app-manage-blog',
  templateUrl: './manage-blog.component.html',
  styleUrls: ['./manage-blog.component.scss']
})
export class ManageBlogComponent implements OnInit, AfterViewInit {

  editorForm: FormGroup;
  durationInSeconds = 5;
  reloadBlogs = false;
  blogToUpdate: any = ''
  isShow: boolean;
  topPosToStartShowing = 100;
  loadEditor = true;
  uploadingBlog = false;
  coverImage = '';
  displayUploadButton: boolean = false;
  constructor(
    private blogService: GetBlogsService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private cdRef:ChangeDetectorRef) { }

  ngOnInit() {
    this.editorForm = this.fb.group({
      editor: ['', Validators.required],
      title: ['', Validators.required]
    })
  }

  ngAfterViewInit() {
    this.loadEditor = false;
    this.cdRef.detectChanges();
  }

  submitBlog() {
    this.uploadingBlog = true;
    if (this.blogToUpdate !== '') {
      this.blogToUpdate.title = this.editorForm.value.title;
      this.blogToUpdate.htmlBody = this.editorForm.value.editor;
      if (this.coverImage != '') {
        this.blogToUpdate.coverImage = this.coverImage;
      }
      this.updateBlog(this.blogToUpdate);
    } else {
      const blog = {
        author: {
          id: 0,
          authorName: "Mwooyo Gwa Janzi",
          authorId: "@kanzukazaha",
          authorBio: "Mwooyo Gwa Janzi is a leading Author on Medium with over 5 years of experience in the field",
          profilePic: "https://placeimg.com/300/300/people",
          facebookLink: "#",
          twitterLink: "#",
          instagramLink: "#",
          linkedInLink: "#",
          modifiedOn: "2020-03-29T18:34:23.6606922+00:00",
          createdOn: "2020-03-29T18:34:23.6606901+00:00"
        },
        id: 0,
        coverImage: "https://placeimg.com/800/300/nature",
        htmlBody: this.editorForm.value.editor,
        title: this.editorForm.value.title
      }
      if (this.coverImage != '') {
        blog.coverImage = this.coverImage;
      }
      this.createBlog(blog);
    }

  }

  updateBlogItem(data) {
    this.blogToUpdate = data;
    this.editorForm.patchValue({
      title: data.title,
      editor: data.htmlBody
    });

    this.gotoTop();
  }

  createBlog(blog) {
    this.blogService.createBlog(blog).subscribe(data => {
      if (data.statusDesc == "SUCCESS") {
        this.snackBar.open('Blog has been created successfully', '', {
          duration: 5000,
          panelClass: ['green-snackbar']
        });
        this.editorForm.patchValue({
          title: '',
          editor: ''
        });
        this.reloadBlogs = true;
      } else {
        this.snackBar.open(data.statusDesc, '', {
          duration: 5000,
          panelClass: ['red-snackbar']
        });
      }
      this.uploadingBlog = false;
    });
  }

  updateBlog(blog) {
    this.blogService.createBlog(blog).subscribe(data => {
      if (data.statusDesc == "SUCCESS") {
        this.snackBar.open('Blog has been updated successfully', '', {
          duration: 5000,
          panelClass: ['green-snackbar']
        });
        this.editorForm.patchValue({
          title: '',
          editor: ''
        });
        this.reloadBlogs = true;
        this.blogToUpdate = '';
      } else {
        this.snackBar.open(data.statusDesc, '', {
          duration: 5000,
          panelClass: ['red-snackbar']
        });
      }
      this.uploadingBlog = false;
    });
  }

  @HostListener('window:scroll')
    checkScroll() {
      const scrollPosition = window.pageYOffset
      || document.documentElement.scrollTop
      || document.body.scrollTop || 0;
      
      if (scrollPosition >= this.topPosToStartShowing) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    }

    gotoTop() {
      window.scroll({ 
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
      });
    }


    uploadCoverImage(data) {
      if (data === 'yes') {
        this.displayUploadButton = true;
      } else if (data === 'no') {
        this.displayUploadButton = false;
      }
    }

    upload() {
      var myWidget = cloudinary.createUploadWidget({
        cloudName: 'do6g6dwlz', 
        uploadPreset: 'vdoc0rsk',
        multiple: false}, (error, result) => { 
          if (!error && result && result.event === "success") { 
            this.coverImage = result.info.secure_url;
          }
        }
      );
  
      myWidget.open();
      }

}
