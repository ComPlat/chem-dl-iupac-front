// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

"use strict";

let row = '<tr>' +
    '   <td><input type="text" placeholder="smile" name="smileInput" value=""/></td>' +
    '   <td><button class="tableButton" id="addRow">+</button></td>' +
    '   <td><button class="tableButton" id="rmvRow">-</button></td>' +
    '</tr>';

$(function () {
    // initialize table with one empty row
    $("#dyTab tbody").append(row);
    // make table rows movable TODO
    // $('tbody').sortable();
    $(document).on('click', '#addRow', function () {
        // give next row length of current row
        let new_row = row
        $(this).closest('tr').after(new_row);
    });

    $(document).on('click', '#rmvRow', function () {
        // do not delete last row in table
        if ($(this).parents('tbody').children().length > 1) {
            $(this).parents('tr').remove(); // this => - button
        }
    });

    // test data
    // let smiles = {
    //     "smis": [
    //         "CS(=O)(=O)OCCCBr", 
    //         "CS(=O)(OCCCBr)=O", 
    //         "O=C(O)c1ccc(NC(=O)C2CCC2)cc1",
    //         "O=C(O)c1ccc(cc1)(NC(=O)C2CCC2)",
    //         "CN(Cc1ccc(C(C)(C)C)cc1)c1cccc2ccccc12.Cl",
    //         "Cl.CN(Cc1ccc(C(C)(C)C)cc1)c1cccc2ccccc12"
    //     ]
    // }

    const smilesUser = {
        "smis": []
    }

    //TODO if smilesUser not empty
    $('#genIupac').click(function () {
        // get smiles from user input
        smilesUser["smis"] = [];
        $('#dyTab [name="smileInput"]').each(function (i, e) {
            smilesUser["smis"].push($(e).val());
        });

        // fetch data from machine learning model
        (async () => {
            const iupacsML = await fetch_iupacs();
            // clear generates iupacs
            $("#secShowIupac tbody").empty();
            // $("#secShowIupac p").append(JSON.stringify(iupacsML));
            console.log(iupacsML);
            for (const [key, val] of Object.entries(iupacsML)) {
                if (key !== "") {
                    $("#iupacTable tbody").append('<tr><td><b>' + key + '</b><td></tr>')
                    for (const [key1, val1] of Object.entries(val)) {
                        $("#iupacTable tbody").append('<tr><td>' + key1 + '<td><td>' + val1 + '<td></tr>')
                    }
                }
            }
            // $('[name="operation"]').show();
            // todo copy & save in rails
            $('#copy').click(function () {
                navigator.clipboard.writeText(JSON.stringify("iupacsML"));
            })
            $('#save').click(function () {
                let blob_JSON = new Blob([JSON.stringify(iupacsML)], { type: "application/json" });
                fileDownload(blob_JSON);
            });

        })()
    });

    async function fetch_iupacs() {
        const response = await fetch('http://0.0.0.0:5000/iupac_name', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(smilesUser),
        })

        return await response.json();
        // TODO catch error
    }

}); // END 

