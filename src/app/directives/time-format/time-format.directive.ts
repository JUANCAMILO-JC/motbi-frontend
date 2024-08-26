import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appTimeInput]',
  standalone: true
})
export class TimeInputDirective {
    constructor(private el: ElementRef) {}
  
    @HostListener('input', ['$event'])
    onInput(event: any): void {
      let value = event.target.value;
      value = value.replace(/[^0-9]/g, '');
  
      if (value.length > 4) {
        value = value.substr(0, 4);
      }
  
      const hours = parseInt(value.substr(0, 2), 10);
      const minutes = parseInt(value.substr(2, 2), 10);
  
      let formattedHours = Math.min(Math.max(0, hours), 24);
      const formattedMinutes = Math.min(Math.max(0, minutes), 59);
  
      if (formattedHours === 24) {
        formattedHours = 0;
      }
  
      const formattedValue = `${this.padNumber(formattedHours)}:${this.padNumber(formattedMinutes)}`;
      event.target.value = formattedValue;
    }
  
    private padNumber(value: number): string {
      return value.toString().padStart(2, '0');
    }
  }