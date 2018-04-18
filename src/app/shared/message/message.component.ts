import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
    <div class="ui-message ui-messages-error" *ngIf="hasError()">
      {{ text }}
    </div>
  `,
  styles: [`
    .ui-messages-error {
      margin: 0;
      margin-top: 4px;
      border-radius: 3px;
    }
  `]
})
export class MessageComponent {

  @Input() error: string;
  @Input() control: FormControl;
  @Input() text: string;

  hasError(): boolean {
    return this.control.hasError(this.error) && this.control.dirty;
  }
}
