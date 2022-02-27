def handle_get_machines(machines, query):
    return [machine for machine in (machines.find(query))]