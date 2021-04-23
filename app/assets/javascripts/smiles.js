// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

"use strict";

let row = '<tr>' +
'   <td><input type="text" placeholder="smile" name="smileInput" value=""/></td>' +
'   <td><button class="tableButton" id="addRow">+</button></td>' +
'   <td><button class="tableButton" id="rmvRow">-</button></td>' +
'</tr>';

$(function(){
    // initialize table with one empty row
$("tbody").append(row);
    // alert('loaded');
// make table rows movable TODO
// $('tbody').sortable();
$(document).on('click', '#addRow', function() {
    // give next row length of current row
    let new_row = row
    $(this).closest('tr').after(new_row);
});

$(document).on('click', '#rmvRow', function() {
    // do not delete last row in table
    if ($(this).parents('tbody').children().length > 1) {
        $(this).parents('tr').remove(); // this => - button
    }
});

let smiles = {
    "smis": [
        "CS(=O)(=O)OCCCBr", 
        "CS(=O)(OCCCBr)=O", 
        "O=C(O)c1ccc(NC(=O)C2CCC2)cc1",
        "O=C(O)c1ccc(cc1)(NC(=O)C2CCC2)",
        "CN(Cc1ccc(C(C)(C)C)cc1)c1cccc2ccccc12.Cl",
        "Cl.CN(Cc1ccc(C(C)(C)C)cc1)c1cccc2ccccc12"
    ]
}

const iupacs = () => {
    fetch('http://0.0.0.0:5000/iupac_name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(smiles),
      })
  .then(response => response.json())
  .then(smiles => console.log(smiles));
//   .catch(error) => 
//     console.error('Error:', error);
}

iupacs()

const test = () => {
    fetch('http://0.0.0.0:5000/test')
  .then(response => response.json())
  .then(smiles => console.log(smiles));
}

test();

}); // END 