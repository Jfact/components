import { Component, input } from '@angular/core';
import { OutputComponent } from './output.component';

@Component({
		standalone: true,
		selector: 'app-form-field',
		imports: [
				OutputComponent
		],
		template: `
				<label>
						{{ label() }}
						<ng-content/>
						<output class="error">
								{{error()}}
						</output>
				</label>
		`
})
export class FormFieldComponent {
		readonly label = input.required<string>();
		readonly error = input.required<string>();
}
