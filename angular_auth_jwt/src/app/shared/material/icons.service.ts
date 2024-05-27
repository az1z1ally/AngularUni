import {Injectable} from '@angular/core';
import {MAT_ICONS} from './mat-icons.constants';
import {SvgIcons} from "./svg-icons";

export interface SvgIcon {
  name: string;
  tag: string;
}

export type IconType = ('SVG' | 'MATERIAL');

export enum IconTypeEnum {
  SVG = 'SVG',
  MATERIAL = 'MATERIAL',
}

@Injectable({
  providedIn: 'root',
})
export class IconsService {
  defaultType: IconType = 'SVG';
  defaultIcon = 'circle';

  svgIcons = SvgIcons;

  materialIcons = Object.keys(MAT_ICONS).map(k => MAT_ICONS[k]).reduce((p, c) => p.concat(c));

  constructor() {
  }

  isSVG = (str) => SvgIcons.find(x => x === str);

  isMaterial = (str) => this.materialIcons.find(icon => icon === str);

  isEither = (s) => this.materialIcons.concat(this.svgIcons).find(icon => (icon?.name ?? icon) === s);

  getType = (str): IconType => this.isSVG(str) ? 'SVG' : (this.isMaterial(str) ? 'MATERIAL' : null);

  setType = (ob: any): any => !(ob.iconType = this.getType(ob.icon)) && (ob.icon = this.defaultIcon);
}
