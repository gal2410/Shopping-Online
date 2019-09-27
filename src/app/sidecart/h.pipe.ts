import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }

    transform(value: any, args: string): any {
      if (!args) {
        return value;
      }
      const specials = [
        // order matters for these
        "-"
        , "["
        , "]"
        // order doesn't matter for any of these
        , "/"
        , "{"
        , "}"
        , "("
        , ")"
        , "*"
        , "+"
        , "?"
        , "."
        , "\\"
        , "^"
        , "$"
        , "|"
      ];
  
      const rgxEscaper = RegExp('[' + specials.join('\\') + ']', 'g');
  
      args = args.replace(rgxEscaper, "\\$&");
  
      // Match in a case insensitive maneer
      const re = new RegExp(`\\\\?${args}` + `(?!([^<]+)?>)`, 'g');
      const match = value.match(re);
  
      // If there's no match, just return the original value.
      if (!match) {
        return value;
      }
  
      const replacedValue = value.replace(re, "<mark>" + match[0] + "</mark>")
      return this.sanitizer.bypassSecurityTrustHtml(replacedValue)
    }
}
