module.exports = {
  plugins: {
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'docs-navbar-breakpoint': '47.5em',
        'docs-mdx-breakpoint': '67.5em',
      },
    },
  },
};
