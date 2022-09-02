// DOM elements
const myIp = document.getElementById("ip");
const locate = document.getElementById("location");
const timezone = document.getElementById("timezone");
const isp = document.getElementById("isp");

const api = "https://api.ipdata.co/?api-key=a518de11479a7774cc93a2ff374998f2dc01b4c7dfdc7f40a3abfd2c";
fetch(api)
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err)
    })
    .then(data => {
        console.log(data)

        const ispProvider = data.asn.name;
        const timezoneProvider = data.time_zone.abbr;
        const timezoneLocation = data.time_zone.offset;
        const { ip, city, country_code, emoji_flag, latitude, longitude } = data;

        myIp.innerHTML = ip;
        locate.innerHTML = `${city}, ${country_code} ${emoji_flag}`;
        timezone.innerHTML = `${timezoneProvider} ${timezoneLocation}`;
        isp.innerHTML = ispProvider;

        // For the map
        mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhZmZleGQiLCJhIjoiY2tvb3JtZXkzMGVoOTJ6cGNzcnpiY3FhbyJ9.uw49z7s69q2Igcpi5sWcIQ';
        const map = new mapboxgl.Map({
        container: 'map', // Container ID
        style: 'mapbox://styles/mapbox/streets-v11', // Map style to use
        center: [longitude, latitude], // Starting position [lng, lat]
        zoom: 10, // Starting zoom level
        });
        // Add the search function
        // Add zoom and rotation controls to the map.
        map.addControl(new mapboxgl.NavigationControl());

        // Create a new marker.
        const marker = new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(map);
});

        // Search for an IP
        const searchIp = document.querySelector("form");
        const inputIp = document.getElementById("searchIp");

        searchIp.onsubmit = (e) => {
            e.preventDefault();

            fetch(`https://api.ipdata.co/${inputIp.value}?api-key=a518de11479a7774cc93a2ff374998f2dc01b4c7dfdc7f40a3abfd2c`)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                try {
                    const ispProvider = data.asn.name;
                    const timezoneProvider = data.time_zone.abbr;
                    const timezoneLocation = data.time_zone.offset;
                    const { ip, city, country_code, emoji_flag, latitude, longitude } = data;
                    function renderInputData(data) {
                        
                        myIp.innerHTML = ip;
                        locate.innerHTML = `${city}, ${country_code} ${emoji_flag}`;
                        timezone.innerHTML = `${timezoneProvider} ${timezoneLocation}`;
                        isp.innerHTML = ispProvider;

                        // For the map
                        mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhZmZleGQiLCJhIjoiY2tvb3JtZXkzMGVoOTJ6cGNzcnpiY3FhbyJ9.uw49z7s69q2Igcpi5sWcIQ';
                        const map = new mapboxgl.Map({
                        container: 'map', // Container ID
                        style: 'mapbox://styles/mapbox/streets-v11', // Map style to use
                        center: [longitude, latitude], // Starting position [lng, lat]
                        zoom: 10, // Starting zoom level
                        });
                        // Add the search function
                        // Add zoom and rotation controls to the map.
                        map.addControl(new mapboxgl.NavigationControl());

                        // Create a new marker.
                        const marker = new mapboxgl.Marker()
                        .setLngLat([longitude, latitude])
                        .addTo(map);
                    }
                    renderInputData(data);
                }
                catch {
                    console.log(data.message);
                    const searchInput = document.getElementById("searchIp");
                    searchInput.value = `${data.message}`;
                    searchInput.style.backgroundColor = "#EF0107";
                    searchInput.style.color = "white";
                }
                })
                .catch(error => {
                    console.log(error)
                })
        }

