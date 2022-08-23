import App from './app'

App.listen(process.env.PORT || 3000, () => {
  console.info(`App starting at http://localhost:${process.env.PORT || 3000}`)
  console.info(`Envs: ${process.env.TARGET || 'local'}`)
})
