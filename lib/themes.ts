export const themes = [
  { name: 'default', label: 'Default' },
  { name: 'ocean-blue', label: 'Ocean Blue' },
  { name: 'forest-green', label: 'Forest Green' },
];

export type ThemeName = (typeof themes)[number]['name'];
