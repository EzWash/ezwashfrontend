import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FixedSizeVirtualScrollStrategy, VIRTUAL_SCROLL_STRATEGY} from "@angular/cdk/scrolling";

export class CustomVirtualScrollStrategy extends FixedSizeVirtualScrollStrategy {
  constructor() {
    super(50, 250, 500);
  }
}

@Component({
  selector: 'app-home-car-wash',
  templateUrl: './home-car-wash.component.html',
  styleUrls: ['./home-car-wash.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{provide: VIRTUAL_SCROLL_STRATEGY, useClass: CustomVirtualScrollStrategy}]
})

export class HomeCarWashComponent implements OnInit {
  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
  constructor() { }

  ngOnInit(): void {
  }

}
