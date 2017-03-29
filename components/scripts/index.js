var React = require('react');
var ReactDom = require('react-dom');
var $ = require("jquery");

var shopifyAPI = require('shopify-node-api');
var Shopify = new shopifyAPI({
  shop: 'marc-academy-2.myshopify.com', // MYSHOP.myshopify.com
  shopify_api_key: '32cf068be19f88b8a9dbf997b7948d6e', // Your API key
  access_token: 'ab0d3d7002b3d7217ac5857f1f02ab9d' // Your API password
});

var MainInterface = React.createClass({
    getInitialState: function() {
        return {
          myData: [{
                      "petName": "Buffy",
                      "ownerName": "Hassum Harrod",
                      "aptDate": "2016-06-20 15:30",
                      "aptNotes": "This Chihuahua has not eaten for three days and is lethargic"
                  },
                  {
                      "petName": "Spot",
                      "ownerName": "Constance Smith",
                      "aptDate": "2016-06-24 08:30",
                      "aptNotes": "This German Shepherd is having some back pain"
                  },
                  {
                      "petName": "Goldie",
                      "ownerName": "Barot Bellingham",
                      "aptDate": "2016-06-22 15:50",
                      "aptNotes": "This Goldfish has some weird spots in the belly"
                  },
                  {
                      "petName": "Mitten",
                      "ownerName": "Hillary Goldwyn",
                      "aptDate": "2016-06-21 9:15",
                      "aptNotes": "Cat has excessive hairballs"
                  }
            ]
        } //return
    }, //getInitialState
    componentDidMount: function() {
      this.serverRequest = Shopify.get('/admin/products.json', {}, function(err, data, headers){
          console.log(data); // Data contains product json information
          console.log(headers); // Headers returned from request

          this.setState({
            myData: data
          });
      }.bind(this));
    },
    componentWillUnmount: function(){
      this.serverRequest.abort();
    },
    render: function() {
        var filteredApts = this.state.myData;
        filteredApts = filteredApts.map(function(item, index){
          return(
            <li key={index}>{item.petName}</li>
          )
        });

        return (
          <div className="interface">
            <ul>{filteredApts}</ul>
          </div>
        )
    } //render
}); //MainInterface

ReactDom.render( <MainInterface /> ,
    document.getElementById('petAppointments'));
