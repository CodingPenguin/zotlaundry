import os, uuid
from loguru import logger
from flask import Flask
from pymongo import MongoClient

from dotenv import load_dotenv

load_dotenv()

mongo = MongoClient(os.getenv('MONGO_URL'))

db = mongo.main
machines = db.machines

app = Flask(__name__)

@app.route("/")
def hello():
    unique_id = str(uuid.uuid4())
    machines.insert_one(
        {
            '_id': unique_id,
            'name': 'hello world',
        }
    )
    machine = machines.find_one({'_id': unique_id})
    logger.debug(machine)
    return machine

if __name__ == "__main__":
    app.run()