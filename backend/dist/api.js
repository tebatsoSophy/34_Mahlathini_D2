"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["password"],
  _excluded2 = ["password"];
function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
require('dotenv').config(); // Load environment variables from .env
var express = require("express");
var bcrypt = require("bcrypt");
var Joi = require("joi"); // Import Joi for input validation
var _require = require('mongodb'),
  ObjectId = _require.ObjectId; // Import ObjectId to work with MongoDB ObjectIds
var router = express.Router();
var connectDB = require("./db"); // Import the connectDB function

// Define validation schemas using Joi

var registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    'string.empty': 'Username is required.',
    'string.min': 'Username must be at least 3 characters long.',
    'string.max': 'Username must not exceed 30 characters.',
    'any.required': 'Username is required.'
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required.',
    'string.email': 'Email must be a valid email address.',
    'any.required': 'Email is required.'
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Password is required.',
    'string.min': 'Password must be at least 6 characters long.',
    'any.required': 'Password is required.'
  }),
  gender: Joi.string().valid('male', 'female', 'non-binary', 'other').required().messages({
    'any.only': 'Gender must be one of male, female, non-binary, or other.',
    'any.required': 'Gender is required.'
  }),
  pronouns: Joi.string().allow('').optional().messages({
    'string.base': 'Pronouns must be a string.'
  }),
  profileImage: Joi.string().allow('')["default"]('https://thumbs.dreamstime.com/b/default-avatar-pro…icon-vector-social-media-user-image-182145777.jpg').messages({
    'string.base': 'Profile image must be a valid string.'
  })
});
var loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required.',
    'string.email': 'Email must be a valid email address.',
    'any.required': 'Email is required.'
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Password is required.',
    'string.min': 'Password must be at least 6 characters long.',
    'any.required': 'Password is required.'
  })
});
var profileUpdateSchema = Joi.object({
  bio: Joi.string().max(500).optional() // Bio is optional
  .messages({
    'string.max': 'Bio must be less than or equal to 500 characters.'
  }),
  email: Joi.string().email().required() // Email is required
  .messages({
    'string.email': 'Email must be a valid email address.',
    'any.required': 'Email is required.'
  }),
  username: Joi.string().alphanum().min(3).max(30).required() // Username is required
  .messages({
    'string.alphanum': 'Username must only contain alphanumeric characters.',
    'string.min': 'Username must be at least 3 characters long.',
    'string.max': 'Username must be less than or equal to 30 characters.',
    'any.required': 'Username is required.'
  })
});

// Define validation schemas for adding a song
var addSongSchema = Joi.object({
  name: Joi.string().min(1).max(100).required().messages({
    'string.empty': 'Song title is required.',
    'string.min': 'Song title must be at least 1 character long.',
    'string.max': 'Song title must not exceed 100 characters.',
    'any.required': 'Song title is required.'
  }),
  artist: Joi.string().min(1).max(100).required().messages({
    'string.empty': 'Artist name is required.',
    'string.min': 'Artist name must be at least 1 character long.',
    'string.max': 'Artist name must not exceed 100 characters.',
    'any.required': 'Artist name is required.'
  }),
  link: Joi.string().uri().required().messages({
    'string.empty': 'Link is required.',
    'string.uri': 'Link must be a valid URL.',
    'any.required': 'Link is required.'
  }),
  playlistId: Joi.string().optional() // Make playlistId optional
  .messages({
    'string.empty': 'Playlist ID is required when provided.'
  })
});
var createPlaylistSchema = Joi.object({
  name: Joi.string().min(1).max(100).required().messages({
    'string.empty': 'Playlist name is required.',
    'string.min': 'Playlist name must be at least 1 character long.',
    'string.max': 'Playlist name must not exceed 100 characters.',
    'any.required': 'Playlist name is required.'
  }),
  category: Joi.string().min(1).max(50).required().messages({
    'string.empty': 'Category is required.',
    'string.min': 'Category must be at least 1 character long.',
    'string.max': 'Category must not exceed 50 characters.',
    'any.required': 'Category is required.'
  }),
  description: Joi.string().max(300).allow('').optional().messages({
    'string.max': 'Description must not exceed 300 characters.'
  }),
  hashtags: Joi.string().optional().messages({
    'string.base': 'Hashtags must be a string.'
  }),
  coverImage: Joi.string().allow('').optional().messages({
    'string.base': 'Cover image must be a valid string.'
  }),
  songs: Joi.array().items(Joi.object({
    name: Joi.string().min(1).max(100).required().messages({
      'string.empty': 'Song title is required.',
      'string.min': 'Song title must be at least 1 character long.',
      'string.max': 'Song title must not exceed 100 characters.',
      'any.required': 'Song title is required.'
    }),
    artist: Joi.string().min(1).max(100).required().messages({
      'string.empty': 'Artist name is required.',
      'string.min': 'Artist name must be at least 1 character long.',
      'string.max': 'Artist name must not exceed 100 characters.',
      'any.required': 'Artist name is required.'
    }),
    link: Joi.string().uri().required().messages({
      'string.empty': 'Link is required.',
      'string.uri': 'Link must be a valid URL.',
      'any.required': 'Link is required.'
    })
  })).optional().messages({
    'array.base': 'Songs must be an array.'
  })
});

// Middleware for validating request bodies
function validateBody(schema) {
  return function (req, res, next) {
    var _schema$validate = schema.validate(req.body, {
        abortEarly: false
      }),
      error = _schema$validate.error,
      value = _schema$validate.value;
    if (error) {
      var errorMessages = error.details.map(function (detail) {
        return detail.message;
      });
      return res.status(400).json({
        errors: errorMessages
      });
    }
    req.body = value; // Assign the validated value to req.body
    next();
  };
}

// Register Route
router.post("/register", validateBody(registerSchema), /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, username, email, password, gender, pronouns, profileImage, db, existingUser, hashedPassword, result;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password, gender = _req$body.gender, pronouns = _req$body.pronouns, profileImage = _req$body.profileImage;
          _context.prev = 1;
          _context.next = 4;
          return connectDB();
        case 4:
          db = _context.sent;
          _context.next = 7;
          return db.collection("users").findOne({
            email: email
          });
        case 7:
          existingUser = _context.sent;
          if (!existingUser) {
            _context.next = 10;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: "User already exists"
          }));
        case 10:
          _context.next = 12;
          return bcrypt.hash(password, 10);
        case 12:
          hashedPassword = _context.sent;
          _context.next = 15;
          return db.collection("users").insertOne({
            username: username,
            email: email,
            password: hashedPassword,
            gender: gender,
            pronouns: pronouns,
            bio: 'N/A',
            // Initialize bio as an empty string
            profileImage: profileImage,
            // Store the profile image URL
            createdAt: new Date(),
            updatedAt: new Date()
          });
        case 15:
          result = _context.sent;
          res.status(201).json({
            userId: result.insertedId
          });
          _context.next = 23;
          break;
        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](1);
          console.error("Error registering user:", _context.t0);
          res.status(500).json({
            message: "Internal server error"
          });
        case 23:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 19]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

// Login Route
router.post("/login", validateBody(loginSchema), /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body2, email, password, db, user, isPasswordValid, _, userData;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.prev = 1;
          _context2.next = 4;
          return connectDB();
        case 4:
          db = _context2.sent;
          _context2.next = 7;
          return db.collection("users").findOne({
            email: email
          });
        case 7:
          user = _context2.sent;
          if (user) {
            _context2.next = 10;
            break;
          }
          return _context2.abrupt("return", res.status(401).json({
            message: "Invalid credentials"
          }));
        case 10:
          _context2.next = 12;
          return bcrypt.compare(password, user.password);
        case 12:
          isPasswordValid = _context2.sent;
          if (isPasswordValid) {
            _context2.next = 15;
            break;
          }
          return _context2.abrupt("return", res.status(401).json({
            message: "Invalid credentials"
          }));
        case 15:
          // Exclude sensitive fields like password
          _ = user.password, userData = _objectWithoutProperties(user, _excluded); // Send the user data as part of the response
          res.status(200).json({
            message: "Login successful",
            user: userData
          });
          _context2.next = 23;
          break;
        case 19:
          _context2.prev = 19;
          _context2.t0 = _context2["catch"](1);
          console.error("Error during login:", _context2.t0);
          res.status(500).json({
            message: "Internal server error"
          });
        case 23:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 19]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

// Update Profile Route (for updating bio)
router.put("/profile", validateBody(profileUpdateSchema), /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var bio, userId, db, result;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          bio = req.body.bio;
          userId = req.user.id; // Assuming you're using JWT and have user ID in `req.user`
          _context3.prev = 2;
          _context3.next = 5;
          return connectDB();
        case 5:
          db = _context3.sent;
          _context3.next = 8;
          return db.collection("users").updateOne({
            _id: userId
          }, {
            $set: {
              bio: bio,
              updatedAt: new Date()
            }
          });
        case 8:
          result = _context3.sent;
          if (!(result.matchedCount === 0)) {
            _context3.next = 11;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            message: "User not found"
          }));
        case 11:
          res.status(200).json({
            message: "Profile updated successfully"
          });
          _context3.next = 18;
          break;
        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](2);
          console.error("Error updating profile:", _context3.t0);
          res.status(500).json({
            message: "Internal server error"
          });
        case 18:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[2, 14]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

// Fetch User by ID Route
router.get('/user/:userId', /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var userId, db, user, _, userData;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          userId = req.params.userId;
          _context4.prev = 1;
          _context4.next = 4;
          return connectDB();
        case 4:
          db = _context4.sent;
          _context4.next = 7;
          return db.collection('users').findOne({
            _id: new ObjectId(userId)
          });
        case 7:
          user = _context4.sent;
          if (user) {
            _context4.next = 10;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            message: "User not found"
          }));
        case 10:
          // Exclude sensitive fields like password
          _ = user.password, userData = _objectWithoutProperties(user, _excluded2);
          res.status(200).json(userData);
          _context4.next = 18;
          break;
        case 14:
          _context4.prev = 14;
          _context4.t0 = _context4["catch"](1);
          console.error("Error fetching user:", _context4.t0);
          res.status(500).json({
            message: "Internal server error"
          });
        case 18:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[1, 14]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());

// Fetch all songs Route
router.get('/songs', /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var db, songs;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          console.log("Fetching songs..."); // Log this message
          _context5.prev = 1;
          _context5.next = 4;
          return connectDB();
        case 4:
          db = _context5.sent;
          _context5.next = 7;
          return db.collection('songs').find().toArray();
        case 7:
          songs = _context5.sent;
          // console.log("Songs fetched successfully:", songs); // Log the fetched songs
          res.status(200).json(songs);
          _context5.next = 15;
          break;
        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](1);
          console.error('Error fetching songs:', _context5.t0);
          res.status(500).json({
            message: 'Internal server error'
          });
        case 15:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 11]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
router.get('/playlist', /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var db, playlists;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          console.log("Fetching Playlists..."); // Log this message
          _context6.prev = 1;
          _context6.next = 4;
          return connectDB();
        case 4:
          db = _context6.sent;
          _context6.next = 7;
          return db.collection('playlists').find().toArray();
        case 7:
          playlists = _context6.sent;
          // console.log("Songs fetched successfully:", songs); // Log the fetched songs
          res.status(200).json(playlists);
          _context6.next = 15;
          break;
        case 11:
          _context6.prev = 11;
          _context6.t0 = _context6["catch"](1);
          console.error('Error fetching playlists:', _context6.t0);
          res.status(500).json({
            message: 'Internal server error'
          });
        case 15:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[1, 11]]);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
router.get('/playlist/:playlistId', /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var playlistId, db, playlist, playlistData;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          playlistId = req.params.playlistId;
          _context7.prev = 1;
          if (ObjectId.isValid(playlistId)) {
            _context7.next = 4;
            break;
          }
          return _context7.abrupt("return", res.status(400).json({
            message: "Invalid playlist ID format"
          }));
        case 4:
          _context7.next = 6;
          return connectDB();
        case 6:
          db = _context7.sent;
          _context7.next = 9;
          return db.collection('playlists').findOne({
            _id: new ObjectId(playlistId)
          });
        case 9:
          playlist = _context7.sent;
          console.log("Query result:", playlist);
          if (playlist) {
            _context7.next = 13;
            break;
          }
          return _context7.abrupt("return", res.status(404).json({
            message: "Playlist not found"
          }));
        case 13:
          // Exclude any sensitive fields if necessary
          playlistData = _extends({}, (_objectDestructuringEmpty(playlist), playlist));
          res.status(200).json(playlistData);
          _context7.next = 21;
          break;
        case 17:
          _context7.prev = 17;
          _context7.t0 = _context7["catch"](1);
          console.error("Error fetching playlist:", _context7.t0);
          res.status(500).json({
            message: "Internal server error"
          });
        case 21:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[1, 17]]);
  }));
  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());
router.get('/song/:songId', /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var songId, db, song, songData;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          songId = req.params.songId;
          _context8.prev = 1;
          if (ObjectId.isValid(songId)) {
            _context8.next = 4;
            break;
          }
          return _context8.abrupt("return", res.status(400).json({
            message: "Invalid playlist ID format"
          }));
        case 4:
          _context8.next = 6;
          return connectDB();
        case 6:
          db = _context8.sent;
          _context8.next = 9;
          return db.collection('songs').findOne({
            _id: new ObjectId(songId)
          });
        case 9:
          song = _context8.sent;
          console.log("Query result:", song);
          if (song) {
            _context8.next = 13;
            break;
          }
          return _context8.abrupt("return", res.status(404).json({
            message: "Playlist not found"
          }));
        case 13:
          // Exclude any sensitive fields if necessary
          songData = _extends({}, (_objectDestructuringEmpty(song), song));
          res.status(200).json(songData);
          _context8.next = 21;
          break;
        case 17:
          _context8.prev = 17;
          _context8.t0 = _context8["catch"](1);
          console.error("Error fetching song:", _context8.t0);
          res.status(500).json({
            message: "Internal server error"
          });
        case 21:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[1, 17]]);
  }));
  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}());
// Add Song Route
router.post('/addsong/:userId', validateBody(addSongSchema), /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var userId, _req$body3, name, artist, link, playlistId, db, newSong, result;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          userId = req.params.userId;
          _req$body3 = req.body, name = _req$body3.name, artist = _req$body3.artist, link = _req$body3.link, playlistId = _req$body3.playlistId;
          _context9.prev = 2;
          if (ObjectId.isValid(userId)) {
            _context9.next = 5;
            break;
          }
          return _context9.abrupt("return", res.status(400).json({
            message: "Invalid user ID format"
          }));
        case 5:
          _context9.next = 7;
          return connectDB();
        case 7:
          db = _context9.sent;
          // Await the database connection
          // Create the new song object
          newSong = {
            name: name,
            artist: artist,
            link: link,
            addedAt: new Date(),
            addedBy: new ObjectId(userId) // Reference the user adding the song
          }; // Optionally add playlistId if provided
          if (!playlistId) {
            _context9.next = 13;
            break;
          }
          if (ObjectId.isValid(playlistId)) {
            _context9.next = 12;
            break;
          }
          return _context9.abrupt("return", res.status(400).json({
            message: "Invalid playlist ID format"
          }));
        case 12:
          newSong.playlistId = new ObjectId(playlistId); // Add playlistId to the song object
        case 13:
          _context9.next = 15;
          return db.collection('songs').insertOne(newSong);
        case 15:
          result = _context9.sent;
          res.status(201).json({
            message: "Song added successfully",
            songId: result.insertedId
          });
          _context9.next = 23;
          break;
        case 19:
          _context9.prev = 19;
          _context9.t0 = _context9["catch"](2);
          console.error("Error adding song:", _context9.t0);
          res.status(500).json({
            message: "Internal server error"
          });
        case 23:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[2, 19]]);
  }));
  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}());
router.post("/createPlaylist/:userId", validateBody(createPlaylistSchema), /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var userId, _req$body4, name, category, description, hashtags, coverImage, songs, db, hashtagsArray, newPlaylist, result;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          userId = req.params.userId;
          _req$body4 = req.body, name = _req$body4.name, category = _req$body4.category, description = _req$body4.description, hashtags = _req$body4.hashtags, coverImage = _req$body4.coverImage, songs = _req$body4.songs;
          _context10.prev = 2;
          if (ObjectId.isValid(userId)) {
            _context10.next = 5;
            break;
          }
          return _context10.abrupt("return", res.status(400).json({
            message: "Invalid user ID format"
          }));
        case 5:
          _context10.next = 7;
          return connectDB();
        case 7:
          db = _context10.sent;
          // Await the database connection
          // Convert comma-separated hashtags to an array
          hashtagsArray = hashtags ? hashtags.split(',').map(function (tag) {
            return tag.trim();
          }) : []; // Create the new playlist object
          newPlaylist = {
            name: name,
            category: category,
            description: description || '',
            // Default to empty string if not provided
            coverImage: coverImage || '',
            // Store the cover image URL
            hashtags: hashtagsArray,
            // Store hashtags as an array
            createdBy: new ObjectId(userId),
            // Reference the user creating the playlist
            songs: songs || [],
            // Default to an empty array if no songs are provided
            createdAt: new Date(),
            updatedAt: new Date()
          }; // Insert the new playlist into the database
          _context10.next = 12;
          return db.collection('playlists').insertOne(newPlaylist);
        case 12:
          result = _context10.sent;
          res.status(201).json({
            message: "Playlist created successfully",
            playlistId: result.insertedId
          });
          _context10.next = 20;
          break;
        case 16:
          _context10.prev = 16;
          _context10.t0 = _context10["catch"](2);
          console.error("Error creating playlist:", _context10.t0);
          res.status(500).json({
            message: "Internal server error"
          });
        case 20:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[2, 16]]);
  }));
  return function (_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}());
router.post('/playlist/:playlistId/add-song/:userId', /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var _req$params, playlistId, userId, songId, db, playlist;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _req$params = req.params, playlistId = _req$params.playlistId, userId = _req$params.userId; // Extract playlistId and userId from params
          songId = req.body.songId; // songId is in the request body
          _context11.prev = 2;
          if (!(!ObjectId.isValid(playlistId) || !ObjectId.isValid(songId))) {
            _context11.next = 5;
            break;
          }
          return _context11.abrupt("return", res.status(400).json({
            error: 'Invalid playlist or song ID format'
          }));
        case 5:
          _context11.next = 7;
          return connectDB();
        case 7:
          db = _context11.sent;
          _context11.next = 10;
          return db.collection('playlists').findOne({
            _id: new ObjectId(playlistId)
          });
        case 10:
          playlist = _context11.sent;
          if (playlist) {
            _context11.next = 13;
            break;
          }
          return _context11.abrupt("return", res.status(404).json({
            error: 'Playlist not found'
          }));
        case 13:
          if (!(playlist.createdBy.toString() !== userId)) {
            _context11.next = 15;
            break;
          }
          return _context11.abrupt("return", res.status(403).json({
            error: 'You are not the owner of this playlist'
          }));
        case 15:
          _context11.next = 17;
          return db.collection('playlists').updateOne({
            _id: new ObjectId(playlistId)
          }, {
            $push: {
              songs: new ObjectId(songId)
            }
          } // Add the song's ObjectId to the songs array
          );
        case 17:
          res.json({
            message: 'Song added to playlist'
          });
          _context11.next = 24;
          break;
        case 20:
          _context11.prev = 20;
          _context11.t0 = _context11["catch"](2);
          console.error('Failed to add song to playlist:', _context11.t0);
          res.status(500).json({
            error: 'Failed to add song to playlist'
          });
        case 24:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[2, 20]]);
  }));
  return function (_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}());

// Edit Profile Route
router.put('/editProfile/:userId', validateBody(profileUpdateSchema), /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var _req$body5, bio, email, username, userId, db, result;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _req$body5 = req.body, bio = _req$body5.bio, email = _req$body5.email, username = _req$body5.username; // Extract the bio, email, and username from the request body
          userId = req.params.userId; // Get the userId from the request parameters
          _context12.prev = 2;
          _context12.next = 5;
          return connectDB();
        case 5:
          db = _context12.sent;
          if (ObjectId.isValid(userId)) {
            _context12.next = 8;
            break;
          }
          return _context12.abrupt("return", res.status(400).json({
            message: "Invalid user ID format"
          }));
        case 8:
          _context12.next = 10;
          return db.collection("users").updateOne({
            _id: new ObjectId(userId)
          },
          // Match the user by ID
          {
            $set: {
              bio: bio,
              email: email,
              username: username,
              updatedAt: new Date() // Set updatedAt to current date
            }
          });
        case 10:
          result = _context12.sent;
          if (!(result.matchedCount === 0)) {
            _context12.next = 13;
            break;
          }
          return _context12.abrupt("return", res.status(404).json({
            message: "User not found"
          }));
        case 13:
          res.status(200).json({
            message: "Profile updated successfully"
          });
          _context12.next = 20;
          break;
        case 16:
          _context12.prev = 16;
          _context12.t0 = _context12["catch"](2);
          console.error("Error updating profile:", _context12.t0);
          res.status(500).json({
            message: "Internal server error"
          });
        case 20:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[2, 16]]);
  }));
  return function (_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}());
module.exports = router;