import uuid


def handle_post_machines(machines, data):
    if "_id" not in data:
        data["_id"] = str(uuid.uuid4())
        
    machines.insert_one(data)
    new_machine = machines.find_one({
        "_id": data["_id"]
    })
    
    return new_machine