require('dotenv').config(); // Load environment variables from .env
const express = require("express");
const bcrypt = require("bcrypt");
const Joi = require("joi"); // Import Joi for input validation
const { ObjectId } = require('mongodb'); // Import ObjectId to work with MongoDB ObjectIds
const router = express.Router();
const connectDB = require("./db"); // Import the connectDB function

// Define validation schemas using Joi

const registerSchema = Joi.object({
    username: Joi.string().min(3).max(30).required()
        .messages({
            'string.empty': 'Username is required.',
            'string.min': 'Username must be at least 3 characters long.',
            'string.max': 'Username must not exceed 30 characters.',
            'any.required': 'Username is required.'
        }),
    email: Joi.string().email().required()
        .messages({
            'string.empty': 'Email is required.',
            'string.email': 'Email must be a valid email address.',
            'any.required': 'Email is required.'
        }),
    password: Joi.string().min(6).required()
        .messages({
            'string.empty': 'Password is required.',
            'string.min': 'Password must be at least 6 characters long.',
            'any.required': 'Password is required.'
        }),
    gender: Joi.string().valid('male', 'female', 'non-binary', 'other').required()
        .messages({
            'any.only': 'Gender must be one of male, female, non-binary, or other.',
            'any.required': 'Gender is required.'
        }),
    pronouns: Joi.string().allow('').optional()
        .messages({
            'string.base': 'Pronouns must be a string.'
        }),
        profileImage: Joi.string().allow('').optional() // Make profileImage optional
        .default('https://thumbs.dreamstime.com/b/default-avatar-pro…icon-vector-social-media-user-image-182145777.jpg')
        .messages({
            'string.base': 'Profile image must be a valid string.',
        }),
    socialMedia: Joi.string().allow('').optional()
        .messages({
            'string.base': 'Social links must be a string.'
        }), 
});

const loginSchema = Joi.object({
    email: Joi.string().email().required()
        .messages({
            'string.empty': 'Email is required.',
            'string.email': 'Email must be a valid email address.',
            'any.required': 'Email is required.'
        }),
    password: Joi.string().min(6).required()
        .messages({
            'string.empty': 'Password is required.',
            'string.min': 'Password must be at least 6 characters long.',
            'any.required': 'Password is required.'
        })
});

const profileUpdateSchema = Joi.object({
    bio: Joi.string()
        .max(500)
        .optional() // Bio is optional
        .messages({
            'string.max': 'Bio must be less than or equal to 500 characters.',
        }),
    email: Joi.string()
        .email()
        .optional()  // Email is required
        .messages({
            'string.email': 'Email must be a valid email address.',
            'any.required': 'Email is required.',
        }),
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .optional()  // Username is required
        .messages({
            'string.alphanum': 'Username must only contain alphanumeric characters.',
            'string.min': 'Username must be at least 3 characters long.',
            'string.max': 'Username must be less than or equal to 30 characters.',
            'any.required': 'Username is required.',
        }),

        socialMedia: Joi.string().max(500).optional()
        .messages({
            'string.base': 'Social links must be a string.'
        }), 
});

// Middleware to validate if ObjectId is valid
function isValidObjectId(id) {
    return ObjectId.isValid(id) && new ObjectId(id).toString() === id;
}




// Define validation schemas for adding a song
const addSongSchema = Joi.object({
    name: Joi.string().min(1).max(100).required()
        .messages({
            'string.empty': 'Song title is required.',
            'string.min': 'Song title must be at least 1 character long.',
            'string.max': 'Song title must not exceed 100 characters.',
            'any.required': 'Song title is required.'
        }),
    artist: Joi.string().min(1).max(100).required()
        .messages({
            'string.empty': 'Artist name is required.',
            'string.min': 'Artist name must be at least 1 character long.',
            'string.max': 'Artist name must not exceed 100 characters.',
            'any.required': 'Artist name is required.'
        }),
    link: Joi.string().uri().required()
        .messages({
            'string.empty': 'Link is required.',
            'string.uri': 'Link must be a valid URL.',
            'any.required': 'Link is required.'
        }),
    playlistId: Joi.string().optional() // Make playlistId optional
        .messages({
            'string.empty': 'Playlist ID is required when provided.',
        })
});

const createPlaylistSchema = Joi.object({
    name: Joi.string().min(1).max(100).required()
        .messages({
            'string.empty': 'Playlist name is required.',
            'string.min': 'Playlist name must be at least 1 character long.',
            'string.max': 'Playlist name must not exceed 100 characters.',
            'any.required': 'Playlist name is required.'
        }),
    category: Joi.string().min(1).max(50).required()
        .messages({
            'string.empty': 'Category is required.',
            'string.min': 'Category must be at least 1 character long.',
            'string.max': 'Category must not exceed 50 characters.',
            'any.required': 'Category is required.'
        }),
    description: Joi.string().max(300).allow('').optional()
        .messages({
            'string.max': 'Description must not exceed 300 characters.'
        }),
    hashtags: Joi.string().optional()
        .messages({
            'string.base': 'Hashtags must be a string.'
        }),
    coverImage: Joi.string().uri().allow('').optional()
        .messages({
            'string.base': 'Cover image must be a valid URL.',
            'string.uri': 'Cover image must be a valid URL.'
        }),
    songs: Joi.array().items(Joi.object({
        name: Joi.string().min(1).max(100).required()
            .messages({
                'string.empty': 'Song title is required.',
                'string.min': 'Song title must be at least 1 character long.',
                'string.max': 'Song title must not exceed 100 characters.',
                'any.required': 'Song title is required.'
            }),
        artist: Joi.string().min(1).max(100).required()
            .messages({
                'string.empty': 'Artist name is required.',
                'string.min': 'Artist name must be at least 1 character long.',
                'string.max': 'Artist name must not exceed 100 characters.',
                'any.required': 'Artist name is required.'
            }),
        link: Joi.string().uri().required()
            .messages({
                'string.empty': 'Link is required.',
                'string.uri': 'Link must be a valid URL.',
                'any.required': 'Link is required.'
            })
    })).optional().messages({
        'array.base': 'Songs must be an array.'
    })
});

// Define validation schema for playlist update
const playlistUpdateSchema = Joi.object({
    name: Joi.string().max(100).optional(),
    category: Joi.string().max(50).optional(),
    description: Joi.string().max(300).optional(),
    coverImage: Joi.string().uri().optional(),
    hashtags: Joi.string().optional()
}).messages({
    'string.max': '{#label} must not exceed {#limit} characters',
    'string.uri': '{#label} must be a valid URL'
});






// Middleware for validating request bodies
function validateBody(schema) {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessages = error.details.map(detail => detail.message);
            return res.status(400).json({ errors: errorMessages });
        }
        req.body = value; // Assign the validated value to req.body
        next();
    };
}

//register
router.post("/register", validateBody(registerSchema), async (req, res) => {
    const { username, email, password, gender, pronouns, profileImage, socialMedia } = req.body;

    try {
        const db = await connectDB(); // Await the database connection
        const existingUser = await db.collection("users").findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Convert social media string to array
        const socialMediaArray = socialMedia ? socialMedia.split(',').map(link => link.trim()) : [];
        const finalProfileImage = profileImage || 'https://thumbs.dreamstime.com/b/default-avatar-pro…icon-vector-social-media-user-image-182145777.jpg';
        // Insert the user into the database
        const result = await db.collection("users").insertOne({
            username,
            email,
            password: hashedPassword,
            gender,
            pronouns,
            bio: 'N/A', // Initialize bio as an empty string
            profileImage: finalProfileImage, // Store the profile image URL
            socialMedia: socialMediaArray, // Store as an array
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        res.status(201).json({ userId: result.insertedId });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});



// Login Route
router.post("/login", validateBody(loginSchema), async (req, res) => {
    const { email, password } = req.body;

    try {
        const db = await connectDB(); // Await the database connection
        const user = await db.collection("users").findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Exclude sensitive fields like password
        const { password: _, ...userData } = user;

        // Send the user data as part of the response
        res.status(200).json({ message: "Login successful", user: userData });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Update Profile Route (for updating bio)
router.put("/profile", validateBody(profileUpdateSchema), async (req, res) => {
    const { bio } = req.body;
    const userId = req.user.id; // Assuming you're using JWT and have user ID in `req.user`

    try {
        const db = await connectDB(); // Await the database connection
        const result = await db.collection("users").updateOne(
            { _id: userId },
            {
                $set: { bio, updatedAt: new Date() }
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Fetch User by ID Route
router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const db = await connectDB(); // Await the database connection
        const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Exclude sensitive fields like password
        const { password: _, ...userData } = user;

        res.status(200).json(userData);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Fetch all songs Route
router.get('/songs', async (req, res) => {
    console.log("Fetching songs..."); // Log this message
    try {
        const db = await connectDB();
        const songs = await db.collection('songs').find().toArray();
       // console.log("Songs fetched successfully:", songs); // Log the fetched songs
        res.status(200).json(songs);
    } catch (error) {
        console.error('Error fetching songs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/playlist', async (req, res) => {
    console.log("Fetching Playlists..."); // Log this message
    try {
        const db = await connectDB();
        const playlists = await db.collection('playlists').find().toArray();
       // console.log("Songs fetched successfully:", songs); // Log the fetched songs
        res.status(200).json(playlists);
    } catch (error) {
        console.error('Error fetching playlists:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/playlist/:playlistId', async (req, res) => {
    const { playlistId } = req.params;

    try {
        // Check if playlistId is a valid ObjectId
        if (!ObjectId.isValid(playlistId)) {
            return res.status(400).json({ message: "Invalid playlist ID format" });
        }
        //console.log("Request playlistId:", playlistId);
        const db = await connectDB(); // Await the database connection
        const playlist = await db.collection('playlists').findOne({ _id: new ObjectId(playlistId) });
        console.log("Query result:", playlist);
        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found" });
        }

        // Exclude any sensitive fields if necessary
        const { ...playlistData } = playlist;

        res.status(200).json(playlistData);
    } catch (error) {
        console.error("Error fetching playlist:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.get('/song/:songId', async (req, res) => {
    const { songId } = req.params;

    try {
        // Check if playlistId is a valid ObjectId
        if (!ObjectId.isValid(songId)) {
            return res.status(400).json({ message: "Invalid playlist ID format" });
        }
        //console.log("Request playlistId:", playlistId);
        const db = await connectDB(); // Await the database connection
        const song = await db.collection('songs').findOne({ _id: new ObjectId(songId) });
        console.log("Query result:", song);
        if (!song) {
            return res.status(404).json({ message: "Playlist not found" });
        }

        // Exclude any sensitive fields if necessary
        const { ...songData } = song;

        res.status(200).json(songData);
    } catch (error) {
        console.error("Error fetching song:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Add Friend Route
router.post('/user/:userId/friends', async (req, res) => {
    const { userId } = req.params;
    const { friendId } = req.body; // Expecting `friendId` in the request body

    console.log("userId:", userId, "friendId:", friendId);


    if (!ObjectId.isValid(userId) || !ObjectId.isValid(friendId)) {
        return res.status(400).json({ message: "Invalid user ID or friend ID" });
    }

    try {
        const db = await connectDB(); // Connect to the database
        const usersCollection = db.collection("users");

        // Check if both users exist
         const friend = await usersCollection.findOne({ _id: new ObjectId(friendId) });
        const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
        // console.log("Found user:", user);
        // console.log("Found friend:", friend);

       if (!user && !friend) {
        return res.status(404).json({ message: "User and friend not found" });
    }

        if (!user) {
            return res.status(404).json({ message: "User  not found" });
        }
        else if ( !friend) {
            return res.status(404).json({ message: " friend not found" });
        }

        // Update both users' friends lists
        await usersCollection.updateOne(
            { _id: new ObjectId(userId) },
            { $addToSet: { friends: new ObjectId(friendId) } } // Prevent duplicates
        );
        await usersCollection.updateOne(
            { _id: new ObjectId(friendId) },
            { $addToSet: { friends: new ObjectId(userId) } }
        );

        res.status(200).json({ message: "Friend added successfully" });
    } catch (error) {
        console.error("Error adding friend:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Fetch User and Their Friends Route
router.get('/user/:userId/friends', async (req, res) => {
    const { userId } = req.params;
   


    if (!isValidObjectId(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    try {
        const db = await connectDB(); // Connect to the database
        const usersCollection = db.collection("users");

        // Retrieve user and populate friends array
        const user = await usersCollection.findOne(
            { _id: new ObjectId(userId) },
            { projection: { password: 0 } }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Fetch full friend details
        const friends = await usersCollection
            .find({ _id: { $in: user.friends || [] } })
            .project({ password: 0 }) // Exclude sensitive fields like password
            .toArray();

        res.status(200).json({ user, friends });
    } catch (error) {
        console.error("Error fetching user friends:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});




// Add Song Route
router.post('/addsong/:userId', validateBody(addSongSchema), async (req, res) => {
    const { userId } = req.params;
    const { name, artist, link, playlistId } = req.body;

    try {
        // Check if userId is a valid ObjectId
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        const db = await connectDB(); // Await the database connection

        // Create the new song object
        const newSong = {
            name,
            artist,
            link,
            addedAt: new Date(),
            addedBy: new ObjectId(userId) // Reference the user adding the song
        };

        // Optionally add playlistId if provided
        if (playlistId) {
            // Ensure playlistId is an ObjectId if it exists
            if (!ObjectId.isValid(playlistId)) {
                return res.status(400).json({ message: "Invalid playlist ID format" });
            }
            newSong.playlistId = new ObjectId(playlistId); // Add playlistId to the song object
        }

        // Insert the new song into the database
        const result = await db.collection('songs').insertOne(newSong);

        res.status(201).json({ message: "Song added successfully", songId: result.insertedId });
    } catch (error) {
        console.error("Error adding song:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/createPlaylist/:userId", validateBody(createPlaylistSchema), async (req, res) => {
    const { userId } = req.params;
    const { name, category, description, hashtags, coverImage, songs } = req.body;

    try {
        // Check if userId is a valid ObjectId
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        const db = await connectDB(); // Await the database connection

        // Convert comma-separated hashtags to an array
        const hashtagsArray = hashtags ? hashtags.split(',').map(tag => tag.trim()) : [];

        // Set a default cover image URL if none is provided
        const coverImageUrl = coverImage || "https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2?v=v2";

        // Create the new playlist object
        const newPlaylist = {
            name,
            category,
            description: description || '', // Default to empty string if not provided
            coverImage: coverImageUrl, // Store the cover image URL or default if not provided
            hashtags: hashtagsArray, // Store hashtags as an array
            createdBy: new ObjectId(userId), // Reference the user creating the playlist
            songs: songs || [], // Default to an empty array if no songs are provided
            createdAt: new Date(),
            updatedAt: new Date()
        };

        // Insert the new playlist into the database
        const result = await db.collection('playlists').insertOne(newPlaylist);

        res.status(201).json({ message: "Playlist created successfully", playlistId: result.insertedId });
    } catch (error) {
        console.error("Error creating playlist:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.post('/playlist/:playlistId/add-songs/:userId', async (req, res) => {
    const { playlistId, userId } = req.params; // Extract playlistId and userId from params
    const { songIds } = req.body; // Expect an array of songIds in the request body
  
    try {
      // Validate playlistId and songIds
      if (!ObjectId.isValid(playlistId) || !Array.isArray(songIds) || songIds.some(id => !ObjectId.isValid(id))) {
        return res.status(400).json({ error: 'Invalid playlist or song ID format' });
      }
  
      const db = await connectDB(); // Ensure the database connection is awaited
  
      // Find the playlist by its ID
      const playlist = await db.collection('playlists').findOne({ _id: new ObjectId(playlistId) });
  
      // Check if playlist exists
      if (!playlist) {
        return res.status(404).json({ error: 'Playlist not found' });
      }
  
      // Check if the logged-in user is the owner of the playlist
      if (playlist.createdBy.toString() !== userId) {
        return res.status(403).json({ error: 'You are not the owner of this playlist' });
      }
  
      // Add each song ID to the playlist's songs array
      const updates = songIds.map(songId => ({
        updateOne: {
          filter: { _id: new ObjectId(playlistId) },
          update: { $addToSet: { songs: new ObjectId(songId) } } // Use $addToSet to avoid duplicates
        }
      }));
  
      await db.collection('playlists').bulkWrite(updates);
  
      res.json({ message: 'Songs added to playlist' });
    } catch (error) {
      console.error('Failed to add songs to playlist:', error);
      res.status(500).json({ error: 'Failed to add songs to playlist' });
    }
  });
  
// Edit Profile Route
router.put('/editProfile/:userId', validateBody(profileUpdateSchema), async (req, res) => {
    const { bio, email, username, socialMedia } = req.body;
    const { userId } = req.params;

    try {
        const db = await connectDB(); // Await the database connection

        // Check if the userId is a valid ObjectId
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        // Convert comma-separated social media links into an array
        const socialMediaArray = socialMedia
            ? socialMedia.split(',').map(link => link.trim())
            : [];

        const result = await db.collection("users").updateOne(
            { _id: new ObjectId(userId) },
            {
                $set: {
                    bio,
                    email,
                    username,
                    socialMedia: socialMediaArray,
                    updatedAt: new Date(),
                }
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Search Users Route
router.get("/search/users", async (req, res) => {
    const { username } = req.query; // Expecting username as a query parameter

    try {
        const db = await connectDB(); // Await the database connection
        const users = await db.collection("users").find({
            username: { $regex: username, $options: "i" } // Case-insensitive search
        }).toArray();
        
        res.status(200).json(users);
    } catch (error) {
        console.error("Error searching users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


// Search Songs Route
router.get("/search/songs", async (req, res) => {
    const { name } = req.query; // Expecting name as a query parameter

    try {
        const db = await connectDB(); // Await the database connection
        const songs = await db.collection("songs").find({
            name: { $regex: name, $options: "i" } // Case-insensitive search
        }).toArray();
        
        res.status(200).json(songs);
    } catch (error) {
        console.error("Error searching songs:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Route to search playlists by name
router.get('/search/playlists', async (req, res) => {
    const { name } = req.query; // Expecting 'name' as a query parameter
  
    if (!name) {
      return res.status(400).json({ message: 'Name query parameter is required.' });
    }
  
    try {
      const db = await connectDB();
      const playlists = await db.collection('playlists').find({
        name: { $regex: name, $options: 'i' } // Case-insensitive search for the playlist name
      }).toArray();
  
      res.status(200).json(playlists);
    } catch (error) {
      console.error('Error searching playlists:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
// Delete Song Route
router.delete('/deletesong/:songId/:userId', async (req, res) => {
    const { songId, userId } = req.params;

    // Check if songId is a valid ObjectId
    if (!ObjectId.isValid(songId)) {
        return res.status(400).json({ message: "Invalid song ID format" });
    }

    try {
        const db = await connectDB(); // Await the database connection
        
        // Find the song by ID
        const song = await db.collection('songs').findOne({ _id: new ObjectId(songId) });

        if (!song) {
            return res.status(404).json({ message: "Song not found" });
        }

        // Check if the user trying to delete the song is the one who added it
        if (song.addedBy.toString() !== userId) {
            return res.status(403).json({ message: "You are not authorized to delete this song" });
        }

        // Proceed to delete the song
        const result = await db.collection('songs').deleteOne({ _id: new ObjectId(songId) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Song not found" });
        }

        res.status(200).json({ message: "Song deleted successfully" });
    } catch (error) {
        console.error("Error deleting song:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Delete Playlist Route
router.delete('/deleteplaylist/:playlistId/:userId', async (req, res) => {
    const { playlistId, userId } = req.params;

    // Check if playlistId is a valid ObjectId
    if (!ObjectId.isValid(playlistId)) {
        return res.status(400).json({ message: "Invalid playlist ID format" });
    }

    try {
        const db = await connectDB(); // Await the database connection
        
        // Find the playlist by ID
        const playlist = await db.collection('playlists').findOne({ _id: new ObjectId(playlistId) });

        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found" });
        }

        // Check if the user trying to delete the playlist is the one who created it
        if (playlist.createdBy.toString() !== userId) {
            return res.status(403).json({ message: "You are not authorized to delete this playlist" });
        }

        // Proceed to delete the playlist
        const result = await db.collection('playlists').deleteOne({ _id: new ObjectId(playlistId) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Playlist not found" });
        }

        res.status(200).json({ message: "Playlist deleted successfully" });
    } catch (error) {
        console.error("Error deleting playlist:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Delete Profile Route
router.delete('/deleteprofile/:userId', async (req, res) => {
    const { userId } = req.params;

    // Check if userId is a valid ObjectId
    if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID format" });
    }

    try {
        const db = await connectDB(); // Await the database connection
        
        // Find the user profile by ID
        const userProfile = await db.collection('users').findOne({ _id: new ObjectId(userId) });

        if (!userProfile) {
            return res.status(404).json({ message: "User profile not found" });
        }

        // Proceed to delete the user profile
        const result = await db.collection('users').deleteOne({ _id: new ObjectId(userId) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "User profile not found" });
        }

        res.status(200).json({ message: "User profile deleted successfully" });
    } catch (error) {
        console.error("Error deleting user profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
// Update Profile Picture
router.put('/updateProfilePic/:userId', async (req, res) => {
    const { userId } = req.params;
    const { profileImage } = req.body; // The new profile image URL
  
    // Basic validation
    if (!profileImage || typeof profileImage !== 'string') {
      return res.status(400).json({ message: 'Invalid profile image URL' });
    }
  
    try {

        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        // Convert comma-separated social media links into an array
        const socialMediaArray = socialMedia
            ? socialMedia.split(',').map(link => link.trim())
            : [];

        const result = await db.collection("users").updateOne(
            { _id: new ObjectId(userId) },
            {
                $set: {
                
                    profileImage: socialMediaArray,
                    updatedAt: new Date(),
                }
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
  });
  
// Edit playlist route
router.put("/editPlaylist/:playlistId/:userId", validateBody(playlistUpdateSchema), async (req, res) => {
    const { playlistId, userId } = req.params;

    try {
        const db = await connectDB();
        const playlist = await db.collection("playlists").findOne({ _id: new ObjectId(playlistId) });

        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found" });
        }

        if(!playlist.createdBy.equals(new ObjectId(userId))){
            return res.status(403).json({ message: "Unauthorized: Only the playlist creator can edit this playlist" });
        }

        // Ensure `hashtags` is stored as an array in the database
        const updatedFields = {
            ...req.body,
            updatedAt: new Date()
        };

        if (updatedFields.hashtags && typeof updatedFields.hashtags === "string") {
            // Split the hashtags string by commas, trim each hashtag, and store as an array
            updatedFields.hashtags = updatedFields.hashtags.split(",").map(tag => tag.trim());
        }

        const result = await db.collection("playlists").updateOne(
            { _id: new ObjectId(playlistId) },
            { $set: updatedFields }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Failed to update playlist" });
        }

        res.status(200).json({ message: "Playlist updated successfully" });
    } catch (error) {
        console.error("Error updating playlist:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.post("/add-friends-field", async (req, res) => {
    try {
        const db = await connectDB(); // Connect to the database

        // Update all documents to add an empty friends array if it doesn't exist
        const result = await db.collection("users").updateMany(
            { friends: { $exists: false } }, // Only update documents without the friends field
            { $set: { friends: [] } }         // Set friends as an empty array
        );

        res.status(200).json({
            message: "Friends array added to all user documents.",
            modifiedCount: result.modifiedCount
        });
    } catch (error) {
        console.error("Error adding friends field:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.post("/add-followers-field", async (req, res) => {
    try {
        const db = await connectDB(); // Connect to the database

        // Update all documents to add an empty friends array if it doesn't exist
        const result = await db.collection("users").updateMany(
            { followers: { $exists: false } }, // Only update documents without the friends field
            { $set: { followers: [] } }         // Set friends as an empty array
        );

        res.status(200).json({
            message: "Followers array added to all user documents.",
            modifiedCount: result.modifiedCount
        });
    } catch (error) {
        console.error("Error adding Followers field:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});



router.post("/add-following-field", async (req, res) => {
    try {
        const db = await connectDB(); // Connect to the database

        // Update all documents to add an empty friends array if it doesn't exist
        const result = await db.collection("users").updateMany(
            { following: { $exists: false } }, // Only update documents without the friends field
            { $set: { following: [] } }         // Set friends as an empty array
        );

        res.status(200).json({
            message: "Followin array added to all user documents.",
            modifiedCount: result.modifiedCount
        });
    } catch (error) {
        console.error("Error adding Followein field:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});



// Add Friend Route
router.post('/user/:userId/follow', async (req, res) => {
    const { userId } = req.params;
    const { followingId } = req.body; // Expecting `friendId` in the request body

    //console.log("userId:", userId, "friendId:", friendId);


    if (!ObjectId.isValid(userId) || !ObjectId.isValid(followingId)) {
        return res.status(400).json({ message: "Invalid user ID or following ID" });
    }

    try {
        const db = await connectDB(); // Connect to the database
        const usersCollection = db.collection("users");

        // Check if both users exist
         const following = await usersCollection.findOne({ _id: new ObjectId(followingId) });
        const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
        // console.log("Found user:", user);
        // console.log("Found friend:", friend);

       if (!user && !following) {
        return res.status(404).json({ message: "User and folowing not found" });
    }

        if (!user) {
            return res.status(404).json({ message: "User  not found" });
        }
        else if ( !followingId) {
            return res.status(404).json({ message: " friend not found" });
        }

        // Update both users' friends lists
        await usersCollection.updateOne(
            { _id: new ObjectId(userId) },
            { $addToSet: { following: new ObjectId(followingId) } } // Prevent duplicates
        );
        await usersCollection.updateOne(
            { _id: new ObjectId(followingId) },
            { $addToSet: { followers: new ObjectId(userId) } }
        );

        res.status(200).json({ message: "Following added successfully" });
    } catch (error) {
        console.error("Error adding following:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Fetch User and Their Friends Route
router.get('/user/:userId/friends', async (req, res) => {
    const { userId } = req.params;
   


    if (!isValidObjectId(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    try {
        const db = await connectDB(); // Connect to the database
        const usersCollection = db.collection("users");

        // Retrieve user and populate friends array
        const user = await usersCollection.findOne(
            { _id: new ObjectId(userId) },
            { projection: { password: 0 } }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Fetch full friend details
        const friends = await usersCollection
            .find({ _id: { $in: user.friends || [] } })
            .project({ password: 0 }) // Exclude sensitive fields like password
            .toArray();

        res.status(200).json({ user, friends });
    } catch (error) {
        console.error("Error fetching user friends:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get('/user/:userId/followers', async (req, res) => {
    const { userId } = req.params;
   


    if (!isValidObjectId(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    try {
        const db = await connectDB(); // Connect to the database
        const usersCollection = db.collection("users");

        // Retrieve user and populate friends array
        const user = await usersCollection.findOne(
            { _id: new ObjectId(userId) },
            { projection: { password: 0 } }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Fetch full friend details
        const followers = await usersCollection
            .find({ _id: { $in: user.followers || [] } })
            .project({ password: 0 }) // Exclude sensitive fields like password
            .toArray();

        res.status(200).json({ user,followers});
    } catch (error) {
        console.error("Error fetching user followers:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get('/user/:userId/following', async (req, res) => {
    const { userId } = req.params;
   


    if (!isValidObjectId(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    try {
        const db = await connectDB(); // Connect to the database
        const usersCollection = db.collection("users");

        // Retrieve user and populate friends array
        const user = await usersCollection.findOne(
            { _id: new ObjectId(userId) },
            { projection: { password: 0 } }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Fetch full friend details
        const following = await usersCollection
            .find({ _id: { $in: user.following || [] } })
            .project({ password: 0 }) // Exclude sensitive fields like password
            .toArray();

        res.status(200).json({ user,following});
    } catch (error) {
        console.error("Error fetching user following:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});



module.exports = router;
