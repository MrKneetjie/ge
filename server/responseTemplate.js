class ServerResponse{
  constructor(status = 'success', data = {}, message = null){
    this.status = status
    this.data = data
    this.message = message
    this.timestamp = Date.now()
  }
}

module.exports = ServerResponse
