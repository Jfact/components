import { Component } from '@angular/core';

@Component({
		standalone: true,
		selector: 'app-output',
		template: `
				<ng-content />
		`
})
export class OutputComponent {}
