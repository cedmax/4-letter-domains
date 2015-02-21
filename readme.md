### DISCLAIMER: 
This scripts was made just for fun (and to find a nice email address). 
I don't endorse cybersquatting, I hate seeing domain parked on weird advertising platforms and if you plan to do so, please just f*ck off.

This script works well with .it domains because the registration rules enforce the existance of the DSN zone. This might not be true for all domain extensions, in particular I found out this is not the case for .com, so don't bother (also .com 4 letter domains are sold out since ages, in web years).

# 4 Letter Domain Finder

There are a lot of Italian (.it) 4 letter domains yet available, I was playing around and I think I found a way to have a list of them in 4 simple (yet long to execute) steps.

First of all download this repo content, npm install.


## STEP 1

```
node 01-generateCombinations.js
```

this will create in a folder ./tmp and within it a series of json files cotaining 750 four letter combinations each.


## STEP 2 

```
node 02-DNSLookup.js
```

this will unroll the json files content to create a list of all the 4 letter .it domains not having a NS record available. Due to the nic.it rules this means that most likely those domains are available.
 
This step might require hours. This is due to the fact that I made it syncronous not to flood your network. I suggest you to run it over night. 

Don't worry if it fails, the whole point of having many json files instead of a huge one, and deleting them when I'm done with it, is to be able to restart where you left off.

## STEP 3 

```
node 03-sortResults.js
```

this will sort the content of your results.txt enabling you to quickly read through them without too much effort (and since last time I checked there were more than 400k domains available it's worth having them ordered).