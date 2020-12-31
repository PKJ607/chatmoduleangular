import { ModuleWithProviders, NgModule } from '@angular/core';
import { ChatComponent } from './chat.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatConfig, ChatSocketService, ChatSetting } from './chatsocket.service';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    ToastrModule.forRoot(),
    FormsModule,
  ],
  exports: [ChatComponent],
  bootstrap: []
})
// export class ChatModule { }

export class ChatModule {
  static forRoot(config: any): ModuleWithProviders<ChatModule> {
    // User config get logged here
    // console.log(config);
    return {
      ngModule: ChatModule,
      providers: [ChatSocketService, { provide: ChatConfig, useValue: config }]
    };
  }
}