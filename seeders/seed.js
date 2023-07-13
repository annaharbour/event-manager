const db = require('../config/db');

db().then((mongo) => {
const connection = mongo.connection.db;

connection.createCollection("assignments").then(async (collection) => {
await collection.insertOne({jobName: 'Announcer Scribe', day: 'friday', ampm: 'am', maxAssignees: 2, assignedTo: [] });
await collection.insertOne({jobName: 'In Gate Steward', day: 'friday', ampm: 'am', maxAssignees: 2, assignedTo: [] });
await collection.insertOne({jobName: 'Judges Scribe', day: 'friday', ampm: 'am', maxAssignees: 2, assignedTo: [] });
await collection.insertOne({jobName: 'Jump Crew', day: 'friday', ampm: 'am', maxAssignees: 4, assignedTo: [] });
await collection.insertOne({jobName: 'Put me where needed', day: 'friday', ampm: 'am', maxAssignees: 1, assignedTo: [] });
await collection.insertOne({jobName: 'Score Runner', day: 'friday', ampm: 'am', maxAssignees: 1, assignedTo: [] });



await collection.insertOne({jobName: 'Announcer Scribe', day: 'friday', ampm: 'pm', maxAssignees: 2, assignedTo: [] });
await collection.insertOne({jobName: 'In Gate Steward', day: 'friday', ampm: 'pm', maxAssignees: 2, assignedTo: [] });
await collection.insertOne({jobName: 'Judges Scribe', day: 'friday', ampm: 'pm', maxAssignees: 2, assignedTo: [] });
await collection.insertOne({jobName: 'Jump Crew', day: 'friday', ampm: 'pm', maxAssignees: 4, assignedTo: [] });
await collection.insertOne({jobName: 'Put me where needed', day: 'friday', ampm: 'pm', maxAssignees: 1, assignedTo: [] });
await collection.insertOne({jobName: 'Score Runner', day: 'friday', ampm: 'pm', maxAssignees: 1, assignedTo: [] });



await collection.insertOne({jobName: 'Announcer Scribe', day: 'saturday', ampm: 'am', maxAssignees: 2, assignedTo: [] });
await collection.insertOne({jobName: 'In Gate Steward', day: 'saturday', ampm: 'am', maxAssignees: 2, assignedTo: [] });
await collection.insertOne({jobName: 'Judges Scribe', day: 'saturday', ampm: 'am', maxAssignees: 2, assignedTo: [] });
await collection.insertOne({jobName: 'Jump Crew', day: 'saturday', ampm: 'am', maxAssignees: 4, assignedTo: [] });
await collection.insertOne({jobName: 'Put me where needed', day: 'saturday', ampm: 'am', maxAssignees: 1, assignedTo: [] });
await collection.insertOne({jobName: 'Score Runner', day: 'saturday', ampm: 'am', maxAssignees: 1, assignedTo: [] });



await collection.insertOne({jobName: 'Announcer Scribe', day: 'saturday', ampm: 'pm', maxAssignees: 2, assignedTo: [] });
await collection.insertOne({jobName: 'In Gate Steward', day: 'saturday', ampm: 'pm', maxAssignees: 2, assignedTo: [] });
await collection.insertOne({jobName: 'Judges Scribe', day: 'saturday', ampm: 'pm', maxAssignees: 2, assignedTo: [] });
await collection.insertOne({jobName: 'Jump Crew', day: 'saturday', ampm: 'pm', maxAssignees: 4, assignedTo: [] });
await collection.insertOne({jobName: 'Put me where needed', day: 'saturday', ampm: 'pm', maxAssignees: 1, assignedTo: [] });
await collection.insertOne({jobName: 'Score Runner', day: 'saturday', ampm: 'pm', maxAssignees: 1, assignedTo: [] });



await collection.insertOne({jobName: 'Announcer Scribe', day: 'sunday', ampm: 'am', maxAssignees: 2, assignedTo: [] });
await collection.insertOne({jobName: 'In Gate Steward', day: 'sunday', ampm: 'am', maxAssignees: 2, assignedTo: [] });
await collection.insertOne({jobName: 'Judges Scribe', day: 'sunday', ampm: 'am', maxAssignees: 2, assignedTo: [] });
await collection.insertOne({jobName: 'Jump Crew', day: 'sunday', ampm: 'am', maxAssignees: 4, assignedTo: [] });
await collection.insertOne({jobName: 'Put me where needed', day: 'sunday', ampm: 'am', maxAssignees: 2, assignedTo: [] });
await collection.insertOne({jobName: 'Score Runner', day: 'sunday', ampm: 'am', maxAssignees: 1, assignedTo: [] });
await collection.insertOne({jobName: 'Score Runner', day: 'sunday', ampm: 'am', maxAssignees: 1, assignedTo: [] });



await collection.insertOne({jobName: 'Announcer Scribe', day: 'sunday', ampm: 'pm', maxAssignees: 2, assignedTo: [] });
await collection.insertOne({jobName: 'In Gate Steward', day: 'sunday', ampm: 'pm', maxAssignees: 2, assignedTo: [] });
await collection.insertOne({jobName: 'Judges Scribe', day: 'sunday', ampm: 'pm', maxAssignees: 2, assignedTo: [] });
await collection.insertOne({jobName: 'Jump Crew', day: 'sunday', ampm: 'pm', maxAssignees: 4, assignedTo: [] });
await collection.insertOne({jobName: 'Put me where needed', day: 'sunday', ampm: 'pm', maxAssignees: 2, assignedTo: [] });
await collection.insertOne({jobName: 'Score Runner', day: 'sunday', ampm: 'pm', maxAssignees: 1, assignedTo: [] });
await collection.insertOne({jobName: 'Score Runner', day: 'sunday', ampm: 'pm', maxAssignees: 1, assignedTo: [] });
});



})