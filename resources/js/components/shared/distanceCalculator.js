

export function haversine_distance(pickLoc, deliverLoc) {
    var R = 6371; // Radius of the Earth in km
    var rlat1 = pickLoc?.geometry.location.lat * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = deliverLoc?.geometry.location.lat * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon =
        (deliverLoc?.geometry.location.lng - pickLoc?.geometry.location.lng) *
        (Math.PI / 180); // Radian difference (longitudes)

    var d =
        2 *
        R *
        Math.asin(
            Math.sqrt(
                Math.sin(difflat / 2) * Math.sin(difflat / 2) +
                    Math.cos(rlat1) *
                        Math.cos(rlat2) *
                        Math.sin(difflon / 2) *
                        Math.sin(difflon / 2)
            )
        );

    var res = Math.round(d * 100) / 100;

    return res;
}

export function charges(distance, weight, service, city) {
    if (
        service == "court_document" ||
        service == "envelopes" ||
        service == "letters"
    ) {
        let dCharge = 0;
        let dWeight = 0;
        let fixCharge = city?.fixed_charges
        let th;
        let gst;
        let pst;
        let ttc;


        distance > city?.min_distance ? dCharge = (distance - city?.min_distance) * city?.per_distance_charges : null ;
        weight > city?.min_weight ? dWeight= (weight- city?.min_weight ) * city?.per_weight_charges : null; 
        th = dCharge + dWeight + fixCharge;
        gst = th * 0.06;
        pst = th * 0.05;

         ttc = th + gst + pst;
        return ttc;
    } else {
        let dCharge = 0;
        let dWeight = 0;
        let fixCharge = 9
        let th;
        let gst;
        let pst;
        let ttc;


        distance > 10 ? dCharge = (distance - 10) * 0.9 : null;
        weight > 5 ? dWeight= (weight- 5 ) * 0.9 : null; 
        th = dCharge + dWeight + fixCharge;
        gst = th * 0.06;
        pst = th * 0.05;

        ttc = th + gst + pst;
        return ttc
    }
}

export function distance(lat1, lon1, lat2, lon2) {
    var R = 6371; // km (change this constant to get miles)
    var dLat = ((lat2 - lat1) * Math.PI) / 180;
    var dLon = ((lon2 - lon1) * Math.PI) / 180;
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    if (d > 1) return Math.round(d) + "km";
    else if (d <= 1) return Math.round(d * 1000) + "m";
    return d;
}

/* export const getDistance = async (origin, destination) => {
    var config = {
        method: "get",
        url: "https://maps.googleapis.com/maps/api/distancematrix/json",
        headers: {},

        params: {
            origins: origin,
            destinations: destination,
            units: "imperial",
            key: "AIzaSyD1lgF45mpnRKc_usCuNbGUdhTQiVC5roM",
        },
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
};
 */