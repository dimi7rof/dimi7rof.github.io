import { Injectable, signal } from '@angular/core';
import { Lang, TRANSLATIONS } from './translations';

const STORAGE_KEY = 'pelletDashboardLanguage';

@Injectable({ providedIn: 'root' })
export class I18nService {
  readonly lang = signal<Lang>(this.load());

  constructor() {
    document.documentElement.lang = this.lang();
  }

  /** Reads the `lang` signal, so it is reactive inside templates and computed(). */
  t(key: string): string {
    return TRANSLATIONS[this.lang()][key] ?? TRANSLATIONS.en[key] ?? key;
  }

  set(lang: Lang): void {
    const next: Lang = lang in TRANSLATIONS ? lang : 'bg';
    this.lang.set(next);
    document.documentElement.lang = next;
    document.title = this.t('appTitle');
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* ignore */ }
  }

  private load(): Lang {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved && saved in TRANSLATIONS) return saved;
    } catch { /* ignore */ }
    return 'bg';
  }
}
