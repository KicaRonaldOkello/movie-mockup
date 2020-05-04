import { Component, OnInit } from '@angular/core';
import { GetBlogsService } from 'src/app/services/blog/get-blogs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentsService } from 'src/app/services/comments/comments.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/guards/auth.service';
import Helpers from 'src/app/helpers/helpers';
import { ShareDataService } from 'src/app/services/share-data/share-data.service';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-display-single-blog',
  templateUrl: './display-single-blog.component.html',
  styleUrls: ['./display-single-blog.component.scss']
})
export class DisplaySingleBlogComponent implements OnInit {

  blogs: any;
  id: any;
  singleBlog: any;
  commentPosted = false;
  articleDoesNotExist = false;
  errorMessage = '';
  currentUrl;
  encodedUrl;
  weiboUrl;
  displayShare = false;
  constructor(
    private blogService: GetBlogsService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router,
    private auth: AuthService,
    private matIconRegistry: MatIconRegistry,
    private sharedService: ShareDataService,
    private commentService: CommentsService) {
      this.sharedService.showAd('true');
      this.matIconRegistry.addSvgIcon(
        "facebook",
        this.sanitizer.bypassSecurityTrustResourceUrl("../assets/facebook.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "twitter",
        this.sanitizer.bypassSecurityTrustResourceUrl("../assets/tweet.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "whatsapp",
        this.sanitizer.bypassSecurityTrustResourceUrl("../assets/whatsapp.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "wechat",
        this.sanitizer.bypassSecurityTrustResourceUrl("../assets/wechat.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "weibo",
        this.sanitizer.bypassSecurityTrustResourceUrl("../assets/weibo.svg")
      );
    }

  ngOnInit() {
    this.blogService.getBlogs(1, 2).subscribe(blog => {
      this.blogs = blog.articles;
    });
    // this.loadDynmicallyScript();

      this.id = this.activatedRoute.snapshot.paramMap.get('id');
      this.id = this.id.replace('_', '/');
   

    this.blogService.getSingleBlog(this.id).subscribe(blog => {
      if (blog.status.statusCode == '100') {
        this.articleDoesNotExist = true;
        this.errorMessage = blog.status.statusDesc;
      } else {
      this.singleBlog = blog;
      this.singleBlog.htmlBody = this.sanitizer.bypassSecurityTrustHtml(this.singleBlog.htmlBody);
      this.weiboUrl = this.sanitizer.bypassSecurityTrustUrl(`http://service.weibo.com/share/share.php?title=${this.singleBlog.title}&url=${this.currentUrl}`);
      }
    });

    this.currentUrl = window.location.href;
    this.encodedUrl = encodeURIComponent(this.currentUrl);

  }

  sendComment(text) {
    if (text.trim() === '') {
      return;
    } else {
      const data = Helpers.getUserData();
      const comment = {
        PageId: `Blog_${this.id}`,
        Comment: text,
        profilePic: "https://placeimg.com/300/300/people",
        UserId: data.authToken.userId,
      }
      this.commentService.saveComment(comment).subscribe(result => {
        this.commentPosted = true;
      });
    }
  }

  commentsRecalled(event) {
    this.commentPosted = false;
  }

  checkIfUserIsLoggedIn() {
    
    if (this.auth.isAuthenticated(this.router.url)) {
      return true;
    } else {
      this.auth.isAuthenticated(this.router.url);
    };
  }

  loadDynmicallyScript() {
    var script = document.createElement('script');
    script.src = 'https://platform-api.sharethis.com/js/sharethis.js#property=5eb01404b892d40012e344a0&product=inline-share-buttons';
    script.async =false;
    document.head.appendChild(script);
    script.onload = () => this.displayShare = true;
 }

}
