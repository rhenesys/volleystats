const fs = require('fs');

document.addEventListener('DOMContentLoaded', function() {
    let btnSave = document.getElementById('savePlayers');
    
    btnSave.addEventListener('click', function () {
        var filePath = "./players.csv";

        dialog.showSaveDialog(function (filePath) {
          if (filePath === undefined) {
            return;
          }
    
          fs.writeFile(filePath, note.value, function (err) {
            if (err === undefined) {
              dialog.showMessageBox({
                message: 'The file has been saved!',
                buttons: ['OK']
              });
            } else {
              dialog.showErrorBox('File save error', err.message);
            }
          });
        });
    });
});