#!/usr/bin/env python3
"""
Serveur de développement local, Pour toi.

Pourquoi ce fichier : `python -m http.server` sert les fichiers tels quels et
ignore `vercel.json`. Toutes les jolies routes (/souvenirs, /histoire, /toi…)
tombent donc en 404 en local, alors qu'elles marchent en production. On croit
avoir cassé le site, et on cherche un bug qui n'existe pas.

Ce serveur lit `vercel.json` et applique les mêmes rewrites. Ce que tu vois en
local correspond à ce que Vercel servira.

Usage :
    python dev-server.py           puis http://localhost:4321
    python dev-server.py 8080      pour choisir le port
"""

import http.server
import json
import os
import socketserver
import sys
from urllib.parse import unquote, urlparse

RACINE = os.path.dirname(os.path.abspath(__file__))
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 4321


def charger_rewrites():
    """Lit les rewrites de vercel.json. Renvoie {source: destination}."""
    chemin = os.path.join(RACINE, "vercel.json")
    try:
        with open(chemin, encoding="utf-8") as f:
            conf = json.load(f)
    except (OSError, json.JSONDecodeError) as e:
        print(f"  vercel.json illisible ({e}), aucune route personnalisée.")
        return {}
    return {r["source"]: r["destination"] for r in conf.get("rewrites", [])}


REWRITES = charger_rewrites()


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=RACINE, **kwargs)

    def translate_path(self, path):
        chemin = unquote(urlparse(path).path)

        # 1. rewrite déclaré dans vercel.json
        if chemin in REWRITES:
            chemin = REWRITES[chemin]

        # 2. repli : /machin sans extension, mais machin.html existe
        elif "." not in os.path.basename(chemin) and chemin != "/":
            candidat = chemin.rstrip("/") + ".html"
            if os.path.isfile(os.path.join(RACINE, candidat.lstrip("/"))):
                chemin = candidat

        return super().translate_path(chemin)

    def end_headers(self):
        # Pas de cache en local : sinon on teste une version périmée sans le
        # savoir, exactement le piège qu'on essaie d'éviter ici.
        self.send_header("Cache-Control", "no-store, must-revalidate")
        super().end_headers()

    def log_message(self, fmt, *args):
        # Ne garder que ce qui est utile : les erreurs.
        msg = fmt % args
        if " 404 " in msg or " 500 " in msg:
            print(f"  {msg}")


class Serveur(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True


if __name__ == "__main__":
    print(f"Pour toi, serveur local")
    print(f"  http://localhost:{PORT}")
    print(f"  {len(REWRITES)} routes lues depuis vercel.json")
    print(f"  Ctrl+C pour arrêter\n")
    try:
        with Serveur(("", PORT), Handler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nArrêté.")
