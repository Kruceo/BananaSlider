export default {
    input: 'src/index.js',
    output: [{
      file: 'dist/bundle.cjs',
      format: 'cjs'
    },
    {
        file: 'dist/bundle.js',
        format: 'es'
      }

]
  };