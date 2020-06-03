import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  AfterViewChecked,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
  host: { '(click)': 'onClickWholeCell()' }
})
export class CellComponent implements OnInit, OnChanges, AfterViewChecked {
  @Input() data: any = undefined;
  @Input() changable = true;

  @Output() update = new EventEmitter<any>();

  @ViewChild('cellInput', { static: false }) cellInput: any;

  public isChanging = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    const changable = changes.changable;

    if (changable && changable.previousValue && !changable.currentValue) {
      this.isChanging = false;
    }
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    if (this.cellInput && this.cellInput.nativeElement) {
      this.cellInput.nativeElement.focus();
    }
  }

  onClickWholeCell() {
    // markForCheck
    this.isChanging = true;
  }

  onInputLoseFocus(event) {
    if (event.relatedTarget === null) {
      // markForCheck
      this.isChanging = false;
    }
  }

  submit(event) {
    // markForCheck
    this.isChanging = false;

    const value = event.target[0].value;

    if (value != this.data) {
      this.data = value;
      this.update.emit(value);
    }

    event.preventDefault();
    event.stopPropagation();
    return false;
  }
}
