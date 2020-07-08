import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Room } from '@types';
import { SubStore } from '../../common/sub-store';
import { LeaveRoomModalComponent } from '../leave-room-modal/leave-room-modal.component';

@Component({
  selector: 'app-room-item',
  templateUrl: './room-item.component.html',
  styleUrls: ['./room-item.component.scss']
})
export class RoomItemComponent implements OnInit {

  @Input() room: Room;

  selected: boolean;

  private _subStore: SubStore;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private clipboard: Clipboard,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
  ) {
    this._subStore = new SubStore();
  }

  /**
   * Component init hanler
   */
  ngOnInit(): void {
    this._subStore.sub = this.route.params.subscribe(({roomId}) => this.selected = this.room._id === roomId);
  }

  /**
   * Online clients count
   */
  online(): number {
    return this.room.clients.filter(i => i.online).length;
  }

  /**
   * Leave room (Show confirm modal)
   */
  leaveRoom(): void {
    this.dialog.open(LeaveRoomModalComponent, {data: {roomId: this.room._id}, width: '450px'});
  }

  /**
   * Copy invite link to clipboard
   */
  copyInviteLink(): void {
    if (this.clipboard.copy(`${window.location.origin}/chat/${this.room._id}`)) {
      this.translate.get('chat.invite_link_was_copied').subscribe(m => {
        this.snackBar.open(m, null, {
          duration: 1500,
          verticalPosition: 'top'
        });
      });
    }
  }
}
