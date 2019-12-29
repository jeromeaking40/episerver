const fs = require('fs');

// Use the code outline below for your answer
var readline = require('readline').createInterface({
    input: fs.createReadStream('sample.csv'),
    output: process.stdout,
    terminal: false
  }),

  counter = 0,

  staffRoster = [],

  Employee = function(staffMember) {
    this.firstname = staffMember.firstname;
    this.familyname = staffMember.familyname;
    this.age = staffMember.age;
    this.id = staffMember.id;

    this.setName = function(newName) {
      this.firstname = newName;
    };
    this.setFullName = function() {
      return this.firstname + ' ' + this.familyname;
    };
  };

readline
  .on('line', function(line) {
    counter += 1;

    var details = line.split(',');

    if(details.length < 3) {
      var staff = new Employee({ id: counter, firstname: null, familyname: null, age: [details[1]] });

      details = details[0].split(" ");

      staff.firstname = details[0];

      staff.familyname = details[1];
    } else {
      var staff = new Employee({ id: counter, firstname: details[0], familyname: details[1], age: [details[2]] });
    }

    staffRoster[counter] = function() {
      console.log("#" + staff.id + ',' + staff.setFullName() + ',' + staff.age);
    };
  })
  .on('close', function() {
    staffRoster.forEach(function(element) {
      element();
    });
    console.log('Have a great day!');
    process.exit(0);
  });
