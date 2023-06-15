
export function haversine_distance(pickLoc, deliverLoc) {
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = pickLoc?.geometry.location.lat * (Math.PI/180); // Convert degrees to radians
    var rlat2 = deliverLoc?.geometry.location.lat * (Math.PI/180); // Convert degrees to radians
    var difflat = rlat2-rlat1; // Radian difference (latitudes)
    var difflon = (deliverLoc?.geometry.location.lng -pickLoc?.geometry.location.lng) * (Math.PI/180); // Radian difference (longitudes)

    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
    
    var res = Math.round(d * 100) / 100

    var f = res + 15.82
    
    return f;
  }