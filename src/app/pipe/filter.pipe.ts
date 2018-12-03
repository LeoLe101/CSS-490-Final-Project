import { Pipe, PipeTransform } from '@angular/core';
import { ApiService } from '../api.service';

@Pipe({
    name: 'filter'
})

export class FilterPipe implements PipeTransform {

    private _service: ApiService;

    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;
        searchText = searchText.toLowerCase();

        return items.filter((image) => {
            return image.hashTag.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
        });
    }
}