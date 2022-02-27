import os, uuid, json
from loguru import logger
from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient

from dotenv import load_dotenv

from routers.get import handle_get_machines
from routers.post import handle_post_machines
from routers.patch import handle_patch_machines

load_dotenv()

mongo = MongoClient(os.getenv('MONGO_URL'))

db = mongo.main
machines = db.machines

app = Flask(__name__)
CORS(app)

@app.route("/machines", methods=['GET', 'POST', 'PATCH'])
def handle_reqs():
    if request.method == 'GET':
        try:
            query = dict(request.args)
            
            if 'floor' in query:
                query['floor'] = int(query['floor'])
                
            return jsonify(handle_get_machines(machines, query)), 200
        
        except Exception as e:
            logger.error(e)
            return jsonify(e), 500
        
    elif request.method == 'POST':
        try:
            data = json.loads(request.data)
            return jsonify(handle_post_machines(machines, data)), 201
        
        except Exception as e:
            logger.error(e)
            return jsonify(e), 500
        
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