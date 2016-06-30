var fs = require('fs'),
    xml2js = require('xml2js');
var _ = require('underscore');
var parser = new xml2js.Parser();

var YTreg = /(.*)youtube\.com(.*)/;
var YTfilename = 'youtube.txt';
var CYDreg = /(.*)name\.kitchen\/claim-your-domain(.*)/;
var CYDtxt = 'cyd-posts.txt';
var INCtxt = 'external.txt';
var VIMreg = /(.*)vimeo\.com(.*)/;
var VIMtxt = 'vimeo.txt'


var fn = VIMtxt;
var reg = VIMreg;

var final_array;


fs.readFile(__dirname + '/data.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
     final_array = _.reduce(result.array.item, function(memo, each, index, list){
    		if(each['content:encoded'][0] && each['content:encoded'][0].match(reg))
    		{
    			memo.push(each.title)
    		}
    		return memo;
    	}, []);
     // console.log(final_array);
     fs.writeFile(fn, final_array.join('\n'), function(err) {
  			if (err) throw err;
  			console.log('It\'s saved!');
	});

    });
});


//META EXTERNAL LINK
// fs.readFile(__dirname + '/data.xml', function(err, data) {
//     parser.parseString(data, function (err, result) {

//      final_array = _.reduce(result.array.item, function(memo, post, index, list){
//            post['newmeta'] = _.filter(post['wp:postmeta'], function(meta, index){
//                 return (meta['wp:meta_key'] == 'external_link');
//             })
//            if(post['newmeta'].length > 0)
//            {
//              memo.push(post.title+' : '+post['newmeta'][0]['wp:meta_value']);
//            }
//            return memo;
//      }, [])
//      fs.writeFile(fn, final_array.join('\n'), function(err) {
//             if (err) throw err;
//             console.log('It\'s saved!');
//     });

//     });
// });