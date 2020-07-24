const HOST = process.env.HOST;

var express = require('express');
const {
  exec
} = require('child_process');

var app = express();
app.get("/", function (req, res) {
  var q = req.query.q;
  var date = req.query.date;

  if (typeof q !== undefined && date !== undefined) {
    twint(q,date);
    res.send(`${q} ${date} were sent.`);
  } else {
    res.send('q=, and date= are required');
  }
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});

function twint(q,date) {
  var query = `twint -es ${HOST}:9200 -s ${q} --since "${date} 00:00:00" --limit 100`
  exec(query, {
    cwd: ''
  }, (err, stdout, stderr) => {
    if (err) {

      // node couldn't execute the command
      return;
    }

    // the *entire* stdout and stderr (buffered)
    console.log(`${query}`);
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
}