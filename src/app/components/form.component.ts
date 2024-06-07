import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputComponent } from './input.component';
import { NgForOf } from '@angular/common';
export interface FieldConfig {
		label: string;
		placeholder: string;
		type: string;
		validators: ValidatorFn[];
		name: string;
}

export type ValidatorFn = (value: string) => string | null;

@Component({
		selector: 'app-dynamic-form',
		standalone: true,
		imports: [FormsModule, InputComponent, NgForOf],
		template: `
    <form (ngSubmit)="submitForm()">
      <ng-container *ngFor="let field of fields">
        <app-input
          [label]="field.label"
          [placeholder]="field.placeholder"
          [validators]="field.validators"
          [(ngModel)]="formData[field.name]"
          [name]="field.name">
        </app-input>
      </ng-container>
      <button type="submit">Submit</button>
    </form>
  `,
		styles: [
				`
      form {
        display: flex;
        flex-direction: column;
        gap: 1em;
      }
      button {
        align-self: flex-end;
      }
    `
		]
})
export class FormComponent {
		@Input() fields: FieldConfig[] = [];
		@Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();

		formData: { [key: string]: string } = {};

		submitForm() {
				this.formSubmit.emit(this.formData);
				// Perform further actions like sending data to the server
		}
}
