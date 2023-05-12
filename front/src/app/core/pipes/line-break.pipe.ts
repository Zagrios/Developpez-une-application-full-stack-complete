import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'lineBreak'
})

export class LineBreak implements PipeTransform {
    transform(text: string|undefined, ...args: any[]): any {
        if (!text || !text.length) {
            return text;
          }
    
        return text.replace(/(\\r\\n)|([\r\n])/gmi, '<br/>');
    }
}