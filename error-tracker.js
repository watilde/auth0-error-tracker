const parseError = require('parse-error')
const MongoClient = require('mongodb').MongoClient

const post = (data, cb) => {
  try {
    const error = parseError(JSON.parse(data.error))
    MongoClient.connect(data.MONGO_URL, function (err, db) {
      if (err) return cb(err)
      const col = db.collection('errors')
      col.insert(error, function (err, result) {
        if (err) return cb(err)
        db.close()
        cb(null, error)
      })
    })
  } catch (e) {
    cb(e)
  }
}

const read = (data, cb) => {
  MongoClient.connect(data.MONGO_URL, function (err, db) {
    if (err) return cb(err)
    const col = db.collection('errors')
    col.find({}).toArray((err, docs) => {
      if (err) return cb(err)
      cb(null, docs)
    })
  })
}

module.exports = function (ctx, done) {
  if (ctx.data.error) return post(ctx.data, done)
  read(ctx.data, done)
}
