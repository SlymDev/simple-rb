import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[userDropdown]'
})
export class DropdownDirective {
  //Add class open (a boostrap class) if isOpen is true:
  @HostBinding('class.open') get opened(){
  	return this.isOpen
  }
  @HostListener('click') open(){
  	this.isOpen = true;
  }
  @HostListener('mouseleave') close(){
  	this.isOpen = false;
  }

  private isOpen = false;


}
