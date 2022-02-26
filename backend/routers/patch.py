def handle_patch_machines(machines, data):
    query = {
        "community": data["community"],
        "floor": data["floor"],
        "number": data["number"]    
    }
    
    updater = {
        "$set": {
            "state": data["state"],
            "remainingTime": data["remainingTime"],
            "timeStarted": data["timeStarted"]
        }
    }
    
    updated_machine = machines.find_one_and_update(filter=query, update=updater, return_document=True)
    return updated_machine