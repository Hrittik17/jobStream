// import { v4 as uuidv4 } from 'uuid'
const connectedusers = new Map()
let activeRooms = []

let io = null

export function setSocketServerInstance(ioInstance) {
    io = ioInstance
}

export function getSocketServerInstance() {
    return io
}

export function addNewConnectedUser({ socketId, userId }) {
    // Ensure userId is stored as a string
    const userIdString = String(userId);
    
    // Check if the user already has an active connection
    if ([...connectedusers.values()].some(value => value.userId === userIdString)) {
        // console.log(`User ${userIdString} is already connected`);
        return; // Don't add the same user again
    }

    connectedusers.set(socketId, { userId: userIdString });
    // console.log("New connected user added:");
    // console.log("  socketId:", socketId);
    // console.log("  userId:", userIdString);
    // console.log("Connected users map now contains:");
    connectedusers.forEach((value, key) => {
        // console.log(`  Socket: ${key}, userId: ${value.userId}`);
    });
}


export function removeConnectUsers(socketId) {
    // console.log(`Removing user with socketId: ${socketId}`);
    // console.log("Before removal:", [...connectedusers.entries()]);

    if (connectedusers.has(socketId)) {
        connectedusers.delete(socketId);
        // console.log(`User with socketId ${socketId} removed.`);
    }

    // console.log("After removal:", [...connectedusers.entries()]);
}

export function getActiveUsers(userId) {
    // console.log("\n========= GET ACTIVE USERS =========");
    
    // Ensure we're working with a clean string
    // Remove any whitespace and convert to lowercase for consistency
    const searchUserId = String(userId).trim();
    // console.log(`Looking for active sockets with userId: "${searchUserId}"`);
    
    // console.log(`Total connected users: ${connectedusers.size}`);
    
    const activeUsers = [];
    
    connectedusers.forEach((value, key) => {
        // Get stored userId as string
        const storedUserId = String(value.userId).trim();
        
        // console.log(`Checking socket ${key} with stored userId: "${storedUserId}"`);
        
        if (storedUserId === searchUserId) {
            // console.log(`  ✓ MATCH FOUND - Adding socket: ${key}`);
            activeUsers.push(key);
        } else {
            // console.log(`  ✗ NO MATCH for socket: ${key}`);
        }
    });
    
    // console.log(`Active sockets found: ${JSON.stringify(activeUsers)}`);
    // console.log("======== END GET ACTIVE USERS ========\n");
    return activeUsers;
}


export function getOnlineUsers() {
    const onlineUsers = []

    connectedusers.forEach((value, key) => {
        onlineUsers.push({ socketId: key, userId: value.userId }) // creating a object consists of all online users in our friendList
    })
    return onlineUsers
}