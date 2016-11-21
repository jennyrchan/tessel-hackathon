var tessel = require('tessel');
var accel = require('accel-mma84').use(tessel.port['A']);

// Initialize the accelerometer.
accel.on('ready', function () {
    // Stream accelerometer data
  var oldX, oldY, oldZ;

  accel.on('data', function(xyz) {
    oldX = xyz[0].toFixed(2),
    oldY = xyz[1].toFixed(2),
    oldZ = xyz[2].toFixed(2);

    console.log(oldX, oldY, oldZ);

  });

  setTimeout(function () {
    console.log('1 second later...');
    accel.removeAllListeners('data');
    // Stream new coordinates and compare to old coordinates
    accel.on('data', function (xyz) {
      var newX = xyz[0].toFixed(2),
          newY = xyz[1].toFixed(2),
          newZ = xyz[2].toFixed(2);

      if (Math.abs(newX - oldX) > 0.01) {
        console.log("MOVING!");
      }

    });
  }, 1000);
});

accel.on('error', function(err){
  console.log('Error:', err);
});
