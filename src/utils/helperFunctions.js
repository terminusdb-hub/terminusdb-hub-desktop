export const isObject = (obj) => {
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return true;
    }
    return false;
}

export const isArray = (arr) => {
    if(Array.isArray(arr) && arr.length) return true;
    return false;
}

export const getCurrentDBID = (client) => {
    if (isObject(client)){
        return client.db();
    }
    else return false;
}


export const getCurrentDBName = (client) => {
    if (isObject(client)){
        const dbRec = client.connection.getDBRecord(client.db(), client.server())
        if (isObject(dbRec)) return dbRec['rdfs:label']['@value'];
        else return false;
    }
    else return false;
}

export const getCurrentSchema = (client) => {
    if (isObject(client)){
       return client.server() + '/'+ client.db() + '/schema'
    }
    else return false;
}

export const resetDB = (client) => {
    if(isObject(client)) {
        return client.connectionConfig.clearCursor();
    }
}
