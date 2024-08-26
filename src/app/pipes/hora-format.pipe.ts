import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'horaFormat',
  pure: false,
  standalone: true
})
export class HoraFormatPipe implements PipeTransform {

    /**
     * Constructor
     */
    constructor()
    {
    }

    /**
     * Transform
     *
     * @param value A string to format hour
     */
    transform(value: any): string {
        let hours = Math.min(Math.max(Number(value) || 0, 1), 23);
    
        return hours.toString().padStart(2, '0') + ":00";
      }
}
