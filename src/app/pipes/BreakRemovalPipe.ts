import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'removeBr' })

export class BreakRemovalPipe implements PipeTransform {
    transform(value: string): string {
        return value.replace(/<br \/>/g, '');
    }
}