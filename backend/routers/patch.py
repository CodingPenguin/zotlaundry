def handle_patch_machines(machines, query, update):
    updated_doc = machines.find_one_and_update(filter = query, update = update)
    return updated_doc