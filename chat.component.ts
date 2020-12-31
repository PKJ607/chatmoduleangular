import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import moment from 'moment';
import { ChatConfig, ChatSocketService } from './chatsocket.service';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
declare var $: any;
@Component({
  selector: 'pkj-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Output() goToPage = new EventEmitter<any>();
  totalMessages: any = 0;
  chats: any = [];
  allChats: any = [];
  @Input() public chatData: any = {}
  @Input() public userData: any = {}
  constructor(
    private chatSocket: ChatSocketService,
    private chatConfig: ChatConfig
  ) {
    this.userData = this.userData;

  }
  message: any = ''
  sendMessage() {
    let data = {
      senderId: this.userData.userId,
      receiverId: this.chatData.receiverId,
      propertyId: this.chatData.propertyId,
      message: this.message || 'Hi'
    }
    // console.log(data)
    this.chatSocket.sendMessage(this.chatConfig.send_chat_channel, data);
    this.message = ''
  }
  checkEnter(event) {
    if (event.keyCode == 13 && !event.shiftKey) {

      //Stops enter from creating a new line 
      event.preventDefault();
      this.sendMessage();
      return true;
    }
  }
  scroll: any = false;
  scrolled(event) {
    const isScrolledToBottom = event.target.scrollHeight - event.target.clientHeight <= event.target.scrollTop + 1;
    // console.log(isScrolledToBottom)
    this.scroll = !isScrolledToBottom
  }
  // getChats() {
  //   let query = {
  //     limit: this.pageSize,
  //     skip: this.pageSize * this.page,
  //     userId: this.chatData.receiverId,
  //     propertyId: this.chatData.propertyId
  //   }
  //   this.http.get(this.chatConfig.config.baseUrl + 'v2/chat/list' + (query ? ('?' + Object.keys(query).map(key => `${key}=${encodeURIComponent(query[key])}`).join('&')) : '')).subscribe((m: any) => {
  //     if (m.data) {
  //       this.allChats = [...this.allChats, ...m.data];
  //       this.total = m.totalCount;
  //       this.processChats()
  //     } else {
  //       this.toast.error(m.meta.message, 'Get Chats!');
  //     }
  //   }, (err) => {
  //     console.log(err)
  //     this.toast.error(err.error.meta.message, 'Get Chats');
  //   })
  // }
  processChats() {
    let dates: any = [];
    this.chats = [];
    (this.chatData.list || []).reverse().map((a) => {
      if (a.message) {
        let dt = moment(a.createdOn).format('YYYY-MM-DD')
        if (dates.indexOf(dt) == -1) {
          dates.push(dt);
          this.chats.push({ type: 'date', date: dt })
        }
        a.time = moment(a.createdOn).format("HH:MM")
        this.chats.push(a)
      }
    })
    // console.log(this.scroll)
    if (!this.scroll) {
      setTimeout(() => {
        this.updateScroll();
      }, 10)
    }
    // console.log(this.comments)
  }
  updateScroll() {
    $("#chatBox").animate({ scrollTop: $('#chatBox')[0].scrollHeight }, 1000);
    this.scroll = false;
  }
  goTo() {
    // this.confirm.emit(this.chatData);
  }
  cretateContract() {
    // this.opneCreateContract.emit(this.chatData);
  }
  ngOnInit() {
    this.chatSocket.getMessage(this.chatConfig.receive_chat_channel).subscribe((a: any) => {
      // console.log('socket', a);
      if ((a.receiverId === this.userData.userId || a.senderId === this.userData.userId) && (a.receiverId === this.chatData.receiverId || a.senderId === this.chatData.receiverId)) {
        this.chats.push(a);
        // console.log(this.scroll)
        if (!this.scroll) {
          setTimeout(() => {
            this.updateScroll();
          }, 10)
        }
      }
    });
    // this.allChats = this.chatData.list || [];
    this.totalMessages = this.chatData.totalMessage;
    // console.log(this)
    this.processChats()
  }
}
