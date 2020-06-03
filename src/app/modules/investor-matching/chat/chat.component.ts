import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ShareDataService} from '../../../services/share-data/share-data.service';
import {ChatsService} from '../../../services/chats/chats.service';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {UsersService} from '../../../services/users/users.service';
import Helpers from '../../../helpers/helpers';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';

declare var cloudinary: any;
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe', {static: false}) private myScrollContainer: ElementRef;
  chats = Array(10);
  myControl = new FormControl();
  message = new FormControl();
  options = [];
  id;
  selectedUserObj;
  userData;
  chatMessages = [];
  myChatDetails;
  myConversations = [];
  attachments = [];
  disabledTextArea = true;
  loadingMessages = false;
  loadConversations = true;
  loadUserNames = true;
  filteredOptions: Observable<any>;
  constructor(
    private shareDataService: ShareDataService,
    private chatsService: ChatsService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    ) {
    this.shareDataService.showAd('true');
    this.userData = Helpers.getUserData();
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params.chatWith;
    });

    this.fetchAllUsers();
    this.fetchMyConversations();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value)),
      );
  }
  private _filter(value): any[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  sendMessage() {
    const data = {
      id: '0',
      toUserId: this.selectedUserObj[0].userId,
      fromUserId: this.userData.userId,
      attachments: this.attachments,
      message: this.message.value,
    };
    this.chatsService.saveChatMessage(data).subscribe(res => {
      if (res.statusCode === '0') {
        this.chatMessages.push(data);
        this.message.reset();
      } else if (res.statusCode === '100') {
        this.snackBar.open(res.statusDesc, '', {
          duration: 6000,
          panelClass: ['red-snackbar']
        });
      }
    });
  }
  fetchAllUsers() {
    this.usersService.getUserByName({}).subscribe(response => {
      this.loadUserNames = false;
      this.options = response.items;
      this.initialUser(this.id);
    });
  }

  fetchAllChats() {
    this.chatsService.getChatConversations({ UserId: this.selectedUserObj[0].userId }).subscribe(response => {
      response.chatConversations.forEach((conversation) => {
        if (conversation.toUserDetails.userId === this.userData.userId) {
          this.loadingMessages = false;
          this.chatMessages = conversation.chatMessages;
          this.myChatDetails = conversation.toUserDetails;
          this.scrollToBottom();
        }
      });
    });
  }

  fetchMyConversations() {
    this.chatsService.getChatConversations({ UserId: this.userData.userId }).subscribe(response => {
      this.loadConversations = false;
      this.myConversations = response.chatConversations;
    });
  }

  selectedUser(event) {
    this.selectedUserObj = this.options.filter(item => item.name === event.option.value);
    this.disabledTextArea = false;
    this.loadingMessages = true;
    this.fetchAllChats();
  }

  initialUser(userId) {
    this.selectedUserObj = this.options.filter(item => item.userId === userId);
    this.myControl.patchValue(this.selectedUserObj[0].name);
    this.disabledTextArea = false;
    this.loadingMessages = true;
    this.fetchAllChats();
  }

  loadConversation(conversation) {
    this.disabledTextArea = false;
    this.myControl.patchValue(conversation.toUserDetails.name);
    this.chatMessages = conversation.chatMessages;
    this.myChatDetails = conversation.toUserDetails;
    this.selectedUserObj = [conversation.toUserDetails];
  }

  upload() {
    const myWidget = cloudinary.createUploadWidget({
        cloudName: 'do6g6dwlz',
        uploadPreset: 'vdoc0rsk',
        multiple: true
      }, (error, result) => {
        if (!error && result && result.event === 'success') {
          this.attachments.push(result.info.secure_url);
        } else if (!error && result && result.event === 'close') {
            return this.snackBar.open('Your attachments have been successfully uploaded', '', {
              duration: 5000,
              panelClass: ['green-snackbar']
            });
        }
      }
    );

    myWidget.open();
  }

  refreshChatPage() {
    this.myControl.reset();
    this.chatMessages = [];
  }

  openAttachment(link) {
    window.open(link, '_blank');
  }
}
