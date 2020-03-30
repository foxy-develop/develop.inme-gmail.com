const TOKEN_KEY = 'accessToken';
const THEME_KEY = 'theme';

const StorageService = {
  get: key => localStorage.getItem(key),
  save: (key, value) => localStorage.setItem(key, value),
  remove: key => localStorage.removeItem(key),
  clear: () => localStorage.clear()
};

const ThemeService = {
  get: () => StorageService.get(THEME_KEY),
  save: theme => StorageService.save(THEME_KEY, theme),
  remove: () => StorageService.remove(THEME_KEY)
};

const TokenService = {
  get: () => StorageService.get(TOKEN_KEY),
  save: theme => StorageService.save(TOKEN_KEY, theme),
  remove: () => StorageService.remove(TOKEN_KEY)
};

export { StorageService, TokenService, ThemeService };
