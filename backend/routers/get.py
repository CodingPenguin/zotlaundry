from loguru import logger

def handle_get_machines(machines, query):
    found_machines = machines.find(query)
    if 'number' in query:
        query['number'] = int(query['number'])
    
    logger.debug(query)
    logger.debug(found_machines)
    return [machine for machine in (machines.find(query))]