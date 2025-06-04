import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MessageService } from '../message.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesComponent {
  messages$: Observable<string[]> = this.messageService.messages$;
  constructor(public messageService: MessageService) {}
}
