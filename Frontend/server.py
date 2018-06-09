port = 5002
print("Port: " + str(port)); 

from http.server import HTTPServer, CGIHTTPRequestHandler
server_address = ("", port)
httpd = HTTPServer(server_address, CGIHTTPRequestHandler)
httpd.serve_forever()
