# Notes
## Crazy fast updating, everywhere
Or "Data on the wire" as they put it.

## Deploy
CRAZY fast & easy.

### To [subdomain].meteor.com
`meteor deploy whatever` » whatever.meteor.com

### Your own host
I host on iwantmyname.com. I can just add the Meteor app to my domain.
Then type `meteor deploy mysite.com` » mysite.com

That's it.

## Auth / Logins
Crazy fast & easy.
Add dependency: `meteor add accounts-ui accounts-password`
in .html: `{{> loginButtons}}`



# Issues
## Mongo
Strongly tied to Mongo. Fast & easy to launch & sync basic stuff, but not right for everything.
