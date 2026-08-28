# DevTinder APIs

## authRouter

POST /signup
POST /login
POST /logout

## profileRouter

GET /profile/new
PATCH /profile/edit
PATCH /profile/password

## connectionRequestRouter

// POST /request/send/interested/:userId
// POST /request/send/ignored/:userId

POST /request/send/:status/:userId

// POST /request/review/accepted/:requestId
// POST /request/review/rejected/:requestId

POST /request/review/:status/:requestId

## userRouter

GET /requests/received
GET /connections
GET /user/feed - gets the profile of all the users

status: ignored, interested, accepted, rejected
