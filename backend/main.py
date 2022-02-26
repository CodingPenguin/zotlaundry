import os, uuid, json
from loguru import logger
from flask import Flask, jsonify, request, abort
from pymongo import MongoClient

from dotenv import load_dotenv

from routers.get import handle_get_machines

load_dotenv()

mongo = MongoClient(os.getenv('MONGO_URL'))

db = mongo.main
machines = db.machines

app = Flask(__name__)

@app.route("/machines", methods=['GET', 'POST', 'PATCH'])
def handle_reqs():
    if request.method == 'GET':
        data = json.loads(request.data)
        found_machines = tuple(handle_get_machines(machines, data))
        return jsonify(found_machines), 200
    elif request.method == 'POST':
        handle_post_machines(machines, request)
    elif request.method == 'PATCH':
        handle_patch_machines(machines, query, update)
    else:
        abort(405)

if __name__ == "__main__":
    app.run()