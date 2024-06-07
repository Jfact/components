import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

type ValidatorFn = (value: string) => string | null;

type InputHtmlType =
		| 'button'
		| 'checkbox'
		| 'color'
		| 'date'
		| 'datetime-local'
		| 'email'
		| 'file'
		| 'hidden'
		| 'image'
		| 'month'
		| 'number'
		| 'password'
		| 'radio'
		| 'range'
		| 'reset'
		| 'search'
		| 'submit'
		| 'tel'
		| 'text'
		| 'time'
		| 'url'
		| 'week';

@Component({
		standalone: true,
		selector: 'app-input',
		template: `
				<input
						[name]="'input-' + label"
						[type]="type"
						[class.required]="error"
						[placeholder]="placeholder"
						[(ngModel)]="value"
						(ngModelChange)="changeValue($event)">
		`,
		imports: [FormsModule]
})
export class InputComponent {
		@Input() label: string = 'Unnamed input';
		@Input() placeholder: string = '';
		@Input() type: InputHtmlType = 'text';
		@Input() validators: ValidatorFn[] = [];
		@Input() value: string = '';
		@Output() change: EventEmitter<string> = new EventEmitter<string>();
		error: string = '';

		static validate(value: string, validators: ValidatorFn[]): string {
				for (const validator of validators) {
						const error = validator(value);
						if (error) {
								return error;
						}
				}
				return '';
		}

		changeValue(value: string) {
				this.value = value;
				this.change.emit(this.value);
				this.error = InputComponent.validate(value, this.validators);
		}
}

@Component({
		standalone: true,
		selector: 'app-input-button',
		imports: [
				FormsModule
		],
		template: `
				<button
						[name]="'input-' + label"
						type="button"
						[class.required]="error"
						[ngModel]="value"
						(ngModelChange)="changeValue($event)">
						{{ label }}
				</button>
		`
})
export class InputButtonComponent extends InputComponent { }

@Component({
		standalone: true,
		selector: 'app-input-checkbox',
		imports: [
				FormsModule
		],
		template: `
				<input
						[name]="'input-' + label"
						type="checkbox"
						[class.required]="error"
						[placeholder]="placeholder"
						[(ngModel)]="value"
						(ngModelChange)="changeValue($event)">
		`
})
export class InputCheckboxComponent extends InputComponent { }

@Component({
		standalone: true,
		selector: 'app-input-color',
		imports: [
				FormsModule
		],
		template: `
				<input
						[name]="'input-' + label"
						type="color"
						[class.required]="error"
						[placeholder]="placeholder"
						[(ngModel)]="value"
						(ngModelChange)="changeValue($event)">
		`
})
export class InputColorComponent extends InputComponent { }

@Component({
		standalone: true,
		selector: 'app-select-input',
		imports: [
				FormsModule
		],
		template: `
				<select
						[name]="'input-' + label"
						[class.required]="error"
						[(ngModel)]="value"
						(ngModelChange)="changeValue($event)">
						<option *ngFor="let option of options" [value]="option.value">{{ option.label }}</option>
				</select>
		`
})
export class InputSelectComponent extends InputComponent {
		@Input() options: { label: string, value: any }[] = [];
}
