import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { FlatService } from '../services/flat-service';
import { MessageService } from '../services/message.service';
import { Message } from '../models/message';
import { Flat } from '../models/flat';

@Component({
  selector: 'app-flat-view-messages',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './flat-view-messages.html',
  styleUrls: ['./flat-view-messages.scss']
})
export class FlatViewMessagesComponent implements OnInit, OnDestroy {
  flatId = '';
  currentUserId = '';
  currentUserName = '';
  currentUserEmail = '';
  flat?: Flat;
  messages: Message[] = [];
  newMessage = '';
  private subs = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private flatService: FlatService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.flatId = this.route.snapshot.paramMap.get('id') || '';

    this.subs.add(
      this.authService.currentUser$.subscribe((user) => {
        if (user) {
          this.currentUserId = user.uid ?? '';
          this.currentUserName = `${user.firstName} ${user.lastName}`;
          this.currentUserEmail = user.email;
        }
      })
    );

    if (this.flatId) {
      this.flatService.getById(this.flatId).subscribe({
        next: (flat) => {
          this.flat = flat;
        }
      });

      this.subs.add(
        this.messageService.getMessagesForFlat(this.flatId).subscribe((messages) => {
          this.messages = messages;
        })
      );
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  async sendMessage() {
    if (!this.newMessage.trim() || !this.flatId || !this.currentUserId) {
      return;
    }

    const message: Message = {
      flatId: this.flatId,
      senderId: this.currentUserId,
      senderName: this.currentUserName,
      senderEmail: this.currentUserEmail,
      text: this.newMessage.trim(),
      createdAt: new Date()
    };

    await this.messageService.sendMessage(message);
    this.newMessage = '';
  }

  get isOwner(): boolean {
    return !!this.flat && this.flat.ownerId === this.currentUserId;
  }

  get filteredMessages() {
    if (this.isOwner) {
      return this.messages;
    }
    return this.messages.filter((m) => m.senderId === this.currentUserId);
  }
}
