module.exports = {
  '*.+(js|ts|tsx)': 'eslint --fix',
  '*.+(js|json|ts|tsx|scss|css|md|mdx)': 'prettier --write',
  // https://github.com/okonet/lint-staged/issues/825#issuecomment-620018284
  '*.+(ts|tsx)': () => 'tsc --pretty --noEmit',
}
