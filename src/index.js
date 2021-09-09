import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $('#getCongressMem').click(function() {
    // const usState = $('#us-state').val();
    // $('#us-state').val("");
    // console.log(usState);

    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `http://www.opensecrets.org/api/?method=getLegislators&id=WA&apikey=${process.env.API_KEY}&output=json`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      }
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function(response) {
      const body = JSON.parse(response);
      const allMem = [];
      for (const i of body.response.legislator) {
          allMem.push(i["@attributes"]);
          }

    for(let i in allMem) {
      $('.showCongressMem').append(`<br>${allMem[i].firstlast}`);
    }

      $('.showErrors').text("");
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error}`);
    });
  });
});
