import os, uuid, json
from loguru import logger
from flask import Flask, jsonify, request, abort
from pymongo import MongoClient

from dotenv import load_dotenv

from routers.get import handle_get_machines
from routers.patch import handle_patch_machines

load_dotenv()

mongo = MongoClient(os.getenv('MONGO_URL'))

db = mongo.main
machines = db.machines

app = Flask(__name__)

@app.route("/machines", methods=['GET', 'POST', 'PATCH'])
def handle_reqs():
    if request.method == 'GET':
        try:
            data = json.loads(request.data)
            return jsonify(handle_get_machines(machines, data)), 200
        except Exception as e:
            logger.error(e)
            return jsonify(e), 500
        
    elif request.method == 'POST':
        handle_post_machines(machines, request)
        
    elif request.method == 'PATCH':
        try:
            data = json.loads(request.data)
            return jsonify(handle_patch_machines(machines, data)), 200
        except Exception as e:
            logger.error(e)
            return jsonify(e), 500
    else:
        return 'No. Method. Not. Allowed.', 405

if __name__ == "__main__":
    app.run()