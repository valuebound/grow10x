const mongoose = require('mongoose')
mongoose.promise = global.Promise
const constants = require("./constants");


module.exports = {
  setupDB () {
    beforeAll(async () => {
      const url = constants.MONGO_URL
      await mongoose.connect(url, { useNewUrlParser: true })
    })

    afterAll(async () => {
      await mongoose.connection.close()
    })
  }
}
