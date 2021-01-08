var preX 
var preY
var preT

window.addEventListener('mousemove', function(event) {
  if (
      preX !== undefined &&
      preY !== undefined &&
      preT !== undefined
    ) {
      var dX = event.screenY - preX
      var dY = event.screenY - preY
      var dD = Math.sqrt(Math.pow(dX,2) + Math.pow(dY,2))
      var dT = event.timeStamp - preT
      console.log(dD / dT * 1000)
    }
    preX = event.screenX
    preY = event.screenY
    preT = event.timeStamp
})

