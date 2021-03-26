var request=require("request-promise");


module.exports = {

    test:  async (req,resp) => {
        var result='eeee';

        var options=[];
        result = result + request.get('http://localhost:3000/api/beers',options,function(err,res,body){
        if(err){
            return 'error on /api/beers<br>';
            console.log('res'+result);
        }
        if(res.statusCode === 200 ){
            return '/api/beers ok<br>'
            console.log('res'+result);
        }
        });

        result = result + request.get('http://localhost:3000/api/beers/id/2',options,function(err,res,body){
        if(err){
            return 'error on /api/beers/id/2<br>';
        }
        if(res.statusCode === 200 ){
            return '/api/beers/id/2 ok<br>'
        }
        });

        result = result + request.get('http://localhost:3000/api/beers/name/Grimergen Blonde',options,function(err,res,body){
        if(err){
            return +  'error on /api/beers/name/Grimergen Blonde<br>';
        }
        if(res.statusCode === 200 ){
            return  '/api/beers/name/Grimergen Blonde ok<br>'
        }
        });

        result = result + request.get('http://localhost:3000/api/breweries',options,function(err,res,body){
        if(err){
            return 'error on /api/breweries<br>';
        }
        if(res.statusCode === 200 ){
            return '/api/breweries ok<br>'
        }
        });

        await new Promise(resolve => setTimeout(resolve, 5000));
        console.log('result: '+result);
        return resp.send(result);
    }
}