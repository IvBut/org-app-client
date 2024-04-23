import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { IThemeSwitcherOption } from '../models/theme-switcher.model';

const CSS_KEY = 'cur-theme-switcher';

function getExistingLinkElementByKey(key: string) {
  return document.head.querySelector(`link[rel="stylesheet"].${key}`);
}
function createLinkElementWithKey(key: string) {
  const linkEl = document.createElement('link');
  linkEl.setAttribute('rel', 'stylesheet');
  linkEl.setAttribute('type', 'text/css');
  linkEl.classList.add(key);
  document.head.appendChild(linkEl);
  return linkEl;
}

@Injectable()
export class ThemeService {
  private httpClient = inject(HttpClient);

  getThemeOptions() {
    return this.httpClient.get<IThemeSwitcherOption[]>('assets/themeOptions.json');
  }

  // eslint-disable-next-line class-methods-use-this
  setTheme(name: string) {
    const path = `./${name}.css`;
    (getExistingLinkElementByKey(CSS_KEY) || createLinkElementWithKey(CSS_KEY)).setAttribute(
      'href',
      path
    );
  }
}
