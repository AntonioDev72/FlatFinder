import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, query, where, orderBy } from 'firebase/firestore';
import { firestore } from '../firebase';
import { Observable } from 'rxjs';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messagesCollection = collection(firestore, 'messages');

  getMessagesForFlat(flatId: string): Observable<Message[]> {
    const q = query(
      this.messagesCollection,
      where('flatId', '==', flatId),
      orderBy('createdAt', 'desc')
    );
    return collectionData(q, { idField: 'id' }) as Observable<Message[]>;
  }

  sendMessage(message: Message): Promise<void> {
    return addDoc(this.messagesCollection, message).then(() => undefined);
  }
}
