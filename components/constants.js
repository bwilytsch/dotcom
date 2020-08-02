// Media queries are not working in global variables

export const viewports = {
  small: (extreme = 'max') => `(${extreme}-width: 40em)`,
  medium: (extreme = 'max') => `(${extreme}-width: 64em)`,
  large: (extreme = 'min') => `(${extreme}-width: 100em)`,
};
