import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Room } from '@types';
import { SubStore } from '../../common/sub-store';

@Component({
  selector: 'app-room-item',
  templateUrl: './room-item.component.html',
  styleUrls: ['./room-item.component.scss']
})
export class RoomItemComponent implements OnInit {

  @Input() room: Room;

  selected: boolean;

  private _subStore: SubStore;

  constructor(private route: ActivatedRoute) {
    this._subStore = new SubStore();
  }

  /**
   * Component init hanler
   */
  ngOnInit(): void {
    this._subStore.sub = this.route.params.subscribe(({roomId}) => this.selected = this.room._id === roomId);
  }
}
