var mkdir = require('safe-mkdir').mkdirSync;
var fs = require('fs');
var Combinatorics = require('js-combinatorics').Combinatorics;

var config = require('./config.json');

var combinations = Combinatorics.baseN( config.chars.split(''), config.domainLength ).toArray();
var domains = combinations.map(function( item ){
	return item.join('');
})

mkdir( config.tmpPath );
while( domains.length ) {
	fs.writeFileSync(
		config.tmpPath + Math.floor( domains.length / config.chunkSize ) + '.json', 
		JSON.stringify( domains.splice( 0, config.chunkSize ) )
	); 
}