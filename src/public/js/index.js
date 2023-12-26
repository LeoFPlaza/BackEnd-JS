const socket = io()

socket.emit('getMsg', 'Mensaje enviado del lado del cliente')
