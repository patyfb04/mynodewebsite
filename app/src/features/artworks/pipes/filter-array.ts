import { Pipe, PipeTransform } from '@angular/core';
import { Artwork } from '../artwork';

@Pipe({
    name: 'artworkFilter',
    pure: false
})
export class ArtworFilterPipe implements PipeTransform {
    transform(items: Artwork[], filter: string): any {
        if (!items || !filter) {
            return items;
        }
        return items.filter(item => item.category.indexOf(filter) !== -1);
    }
}
