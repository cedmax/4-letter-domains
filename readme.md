### DISCLAIMER: 
This scripts was made just for fun (and to find a nice email address). 
I don't endorse cybersquatting, I hate seeing domain parked on weird advertising platforms and if you plan to do so, please just f*ck off.

This script works well with .it domains because the registration rules enforce the existance of the DSN zone. This might not be true for all domain extensions, in particular I found out this is not the case for .com, so don't bother (also .com 4 letter domains are sold out since ages, in web years).

# 4 Letter Domain Finder

There are a lot of Italian (.it) 4 letter domains yet available, I was playing around and I think I found a way to have a list of them in 4 simple (yet long to execute) steps.

First of all download this repo content, npm install.


## Start

```
yarn install && yarn start
```

this will create a `db.json` file containg all the combinations and start looking up the dns for each.
Due to the nic.it rules the domains not having a NS record available are most likely available (or pendingDelete).

This step is parallelised in chuncks sized as per config, but it might still require hours. 

You can stop it anytime: as long as the db.json doesn't get deleted (or you don't change the domain extension / length, or the characters range in the config) it will restart where you left off.

In order to start from scratch run

```
yarn reset
```