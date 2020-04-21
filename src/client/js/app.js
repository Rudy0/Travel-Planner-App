function handleSubmit() {
    event.preventDefault()
    //clear the previous errors
    document.getElementById("error").innerHTML = "";
    // check what text was put into the form field
    let city = document.getElementById("city").value;
    let startDate = document.getElementById("dateStart").value;
    let endDate = document.getElementById("dateEnd").value;

    let departureDate = new Date(startDate);
    let dateToday = new Date();
    let dateDiff = Math.ceil(departureDate.setHours(0, 0, 0) - dateToday.setHours(0, 0, 0)) / (1000 * 3600 * 24);
    let daysLeft = dateDiff.toFixed(0);
    
    // Geonames Api 
    const apiKey = "&username=rudolph008";
    const baseUrlGN = `http://api.geonames.org/searchJSON?q=`;

    console.log("::: Form Submitted :::")
    
    getData(baseUrlGN, city, apiKey)
    .then( (data) => {
        postData('http://localhost:3030/city', {
            location: data.geonames[0].name,
            latitude: data.geonames[0].lat,
            longitude: data.geonames[0].lng,
            country: data.geonames[0].countryName,
            daysleft: daysLeft,
            startDate: startDate,
            endDate: endDate,
         });
    }).then( () => {
        updateUI('http://localhost:3030/all');
    })
}


    // get Geonames API data 
    const getData = async (baseUrlGN, city, apiKey) => {
        const res = await fetch(baseUrlGN+city+apiKey);
        try {
          const data = await res.json();
          return data;
        } catch(error) {
            console.log('error', error);
          }
      };
    //Post Data 

    const postData = async (url='', data={}) => {
        console.log(data);
        const res = await fetch(url, {
          method: 'POST',
          credentials: 'same-origin',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data),
        });
        try {
          console.log(res);
        } catch(error) {
            console.log('error', error);
          }
      };

         // add image

    const addImg = async () => {
        const response = await fetch('http://localhost:3030/img');
        try {
            const img = await response.json();
            console.log(img.hits[0].webformatURL);
            const url = img.hits[0].webformatURL;
            document.getElementById("img").src = url;
            
        } catch(error) {
            console.log('error', error);
            }
        }

  // Get weather

    const getWeather = async () => {
        const response = await fetch('http://localhost:3030/weather');
        try {
            const weather = await response.json();
            
            document.getElementById("weather").innerHTML = `${weather.data.temp} &#8451; `;
        } catch(error) {
            console.log('error', error);
            }
        }
        
    //Make trip card

    const updateUI = async () => {
        const request = await fetch('http://localhost:3030/all');
        try {
          const allData = await request.json();
          
          document.getElementById('results').innerHTML = `<div class="card">
          <img id="img" src="" alt="pixbay">
          <div class="container">
            <h4><strong>Trip to:</strong> ${allData.location} | ${allData.country}</h4>
            <h5><strong>Departing:</strong> ${allData.startDate}</h5>
            <h5><strong>Returning:</strong> ${allData.endDate}</h5>
            <h5><strong>Days left to depart:</strong> ${allData.daysleft}</h5>

            <p>Average weather for then is: <span id="weather"> </span></p>
          </div>
        </div>`;
        addImg();
        getWeather();
        } catch(error) {
            console.log('error', error);
          }
      }
  
    
   
   
export { handleSubmit }
