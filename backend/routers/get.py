def handle_get_machines(machines, query):
    f = [machine for machine in (machines.find(query))]
    print(f)
    return f