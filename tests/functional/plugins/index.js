module.exports = (on, config) => {
  return {
    ...config,
    baseUrl: `http://${process.env.HOST || '0.0.0.0'}:${process.env.PORT || '7777'}`
  }
};
