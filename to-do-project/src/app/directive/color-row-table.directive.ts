import { style } from '@angular/animations';
import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appColorRowTable]'
})
export class ColorRowTableDirective {

  @HostBinding('style.backgroundColor')backroundColor='#8080802b';
  @Input()set appColorRowTable(index:number){
    if(index%2==0){
      this.backroundColor='#8080802b'
    }else{
      this.backroundColor='white'
    }
  };
  constructor() { }

}
