const NodeCache = require("node-cache");

// create a new cache instance
const cache = new NodeCache();

//set the optional (options)

cache.set("cacheOpts", {
    stdTTL: 3600, // Time-to-live (TTL) in seconds, 1 hour in this case
    chechperiod: 600, // Check for expired entries every 10 minutes
    useClones: false, // Use object clones for better performance
});

module.exports = cache; 
