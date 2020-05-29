// establish dependencies
const fs = require('fs');
const path = require('path');

module.exports = app => {
   // read notes file
   fs.readFile('db/db.json', 'utf8', (err, data) => {
      if (err) {
         throw err;
      }

      let notes = JSON.parse(data);

      /**
       * /api routing routine
       **/

      // api get route to return all notes
      app.get("/api/notes", function(req, res) {
         res.json(notes);
      });

      // api get route to retrieve specific note
      app.get('/api/notes/:id', function(req, res) {
         res.json(notes[req.params.id]);
      });

      // api post route
      app.post('/api/notes', function(req, res) {
         // when a note is received, add it to db file and then display new note
         let note = req.body;
         notes.push(note);
         updateJSON();
         return console.log('Added note: ' + note.title);
      });

      // api delete route for specific id
      app.delete('/api/notes/:id', function(req, res) {
         notes.splice(req.params.id, 1);
         updateJSON();
         console.log('Deleted note: ' + req.params.id);
      });

      /**
       * /notes routing routine
       **/

       // display the notes.html as the default page
       app.get('/notes', function(req, res) {
          res.sendFile(path.join(__dirname, '../public/notes.html'));
       });

       // display index.html if any other route is used
       app.get('*', function(req, res) {
          res.sendFile(path.join(__dirname, '../public/index.html'));
       });

       // update the JSON file with new note
       function updateJSON() {
          fs.writeFile('db/db.json', JSON.stringify(notes, '\t'), err => {
             if (err) {
                return err;
             }
             return true;
          });
       }
   });
}