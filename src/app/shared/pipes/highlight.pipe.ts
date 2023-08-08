import {PipeTransform, Pipe} from '@angular/core';

@Pipe({name: 'highlight', standalone: true})

export class HighlightPipe implements PipeTransform {
  transform(text: string, search: string): string {
    let pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");

    pattern = pattern.split(' ').filter((t: string | any[]) => {
      return t.length > 0;
    }).join('|');

    const regex = new RegExp(pattern, 'gi');

    return search ? text.replace(regex, (match) => `<span class="highlight">${match}</span>`) : text;
  }
}
