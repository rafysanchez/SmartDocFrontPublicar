
/**
 * @description Classe para formatar o xml
 * @author Alexandre A Jacobino
 * @since 1.0.0
 */

import * as vkbeautify from 'vkbeautify';
import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'xml'
})
export class XmlPipe implements PipeTransform {
    transform(value: string): string {
        return vkbeautify.xml(value);
    }
}