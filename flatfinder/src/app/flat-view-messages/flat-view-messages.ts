import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flat-view-messages',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './flat-view-messages.html',
  styleUrls: ['./flat-view-messages.scss']
})


export class FlatViewMessagesComponent {
  currentUser = 'Lucas';
  flatOwner = 'Admin';
  messages = [
    { sender: 'Lucas', email: 'lucas@email.com', text: 'Hello!', timestamp: new Date() },
    { sender: 'Admin', email: 'admin@email.com', text: 'Hi!', timestamp: new Date() }
  ];
  newMessage = '';

  sendMessage() {
    if (this.currentUser === this.flatOwner) return;
    if (!this.newMessage.trim()) return;
    this.messages.push({ sender: this.currentUser, email: 'lucas@email.com', text: this.newMessage, timestamp: new Date() });
    this.newMessage = '';
  }

  get filteredMessages() {
  if (this.currentUser === this.flatOwner) {
    return this.messages;
  }
  return this.messages.filter(m => m.sender === this.currentUser);
}
}
