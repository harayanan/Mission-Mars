#!/usr/bin/env python3
"""Static file server for Mission-Mars V3 — served at mission-mars.xisunknown.com.

Public, no auth. Serves the V3/ directory as the site root.
"""
import os
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

PORT = int(os.environ.get("MISSION_MARS_PORT", "9102"))
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "V3")


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def log_message(self, *args):
        pass  # suppress access logs


if __name__ == "__main__":
    os.chdir(ROOT)
    server = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    print(f"Serving Mission-Mars V3 from {ROOT} on port {PORT}")
    server.serve_forever()
