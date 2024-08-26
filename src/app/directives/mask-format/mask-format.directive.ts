import { Directive, ElementRef, Input, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appCustomMask]',
  standalone: true
})
export class CustomMaskDirective implements OnInit {
  @Input() value: string; // Valor inicial con máscara

  constructor(private el: ElementRef<HTMLInputElement>) {}

  ngOnInit() {
    if (this.value) {
      const valueWithoutMask = this.value.toString().replace(/\D/g, ''); // Remueve caracteres no numéricos
      const formattedValue = this.formatWithThousandsSeparator(valueWithoutMask);
      this.el.nativeElement.value = formattedValue;
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const value = event.target.value.replace(/\D/g, ''); // Remueve caracteres no numéricos
    const formattedValue = this.formatWithThousandsSeparator(value);
    this.el.nativeElement.value = formattedValue;
  }

  private formatWithThousandsSeparator(value: string): string {
    const parts = value.split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const decimalPart = parts[1] ? '.' + parts[1] : '';

    // Validar que la parte entera tiene el formato correcto (opcional)
    if (!/^\d{1,3}(\.\d{3})*$/.test(integerPart)) {
      throw new Error("El formato de la parte entera no es válido.");
    }

    return integerPart + decimalPart;
  }
}
