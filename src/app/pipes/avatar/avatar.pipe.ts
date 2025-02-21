import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatar',
  standalone: true
})
export class AvatarPipe implements PipeTransform {

  transform(value: string | null | undefined, fallback: string = 'https://jlmoisan.com/wp-content/uploads/2021/04/user-placeholder.png'): string {
    return value && value.trim() !== '' ? value : fallback;
  }

}
