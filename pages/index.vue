<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        Mepe hälyparseri
      </h1>
      <div id="inputs_box">
        <label for="input-alertText">Hälytyksen sisältö</label>
        <textarea
          v-model="alertText"
          rows="6"
          cols="40"
        ></textarea>
        <button @click="submitForm">
          Näytä kartalla
        </button>
      </div>
      <div id="errors" v-if="errorMessage != ''">
        <p>{{ errorMessage }}</p>
      </div>
      <div id="map_container">
        <div id='map'></div>
        <div id='details' v-if="missionCode!=''">
          <span><strong>Tehtäväkoodi:&nbsp;</strong>{{ missionCode }}</span></br>
          <span><strong>Kuvaus:&nbsp;</strong>{{ description }}</span></br>
          <span><strong>Yksiköt:&nbsp;</strong>{{ units }}</span></br>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      alertText: '',
      errorMessage: '',
      map: {},
      description: '',
      units: '',
      missionCode: ''
    }
  },
  mounted: async function () {
    const atRes = await fetch('/api/token', {
      method: 'GET'
    }).then(response => response.json()).then(data => {
      mapboxgl.accessToken = data.token
      
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 10,
        center: [28.3, 61.2]
      })
    }).catch(err => {
      if (err) {
        console.error(err)
        this.errorMessage = ''
      }
    })
  },
  methods: {
    async submitForm (evt) {
      evt.preventDefault()
      const res = await fetch('/api/alert/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          alert: this.alertText
        })
      }).then(response => response.json()).then(data => {
        console.log('RES', data)
        let el = document.createElement('div');
        el.className = 'marker';

        new mapboxgl.Marker(el)
          .setLngLat([data.lon, data.lat])
          .addTo(this.map);

        // Scroll to map
        $([document.documentElement, document.body]).animate({
          scrollTop: $("#map").offset().top -10
        }, 1500);

        // Center map on marker
        this.map.flyTo({
          center: [data.lon, data.lat]
        });

        this.missionCode = data.missionCode
        this.units = data.units
        this.description = data.description
      }).catch(err => {
        if(err) {
          console.error(err)
          if (err.status == 400) {
            this.errorMessage = 'Tarkista syöte'
          }
        }
      })
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-left: 30px;
  padding-right: 30px;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
  margin-left: 20px;
  margin-right: 20px;
}

#map {
  width: 100%;
  height: 500px;
  margin-bottom: 10px;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
}

#inputs_box {
  margin-top: 20px;
}

.marker {
  position: absolute;
  margin-top: -25px;
  
  border-radius: 50%;
  border: 8px solid #0028FF;
  width: 8px;
  height: 8px;
}

.marker::after {
  position: absolute;
  content: '';
  width: 0px;
  height: 0px;
  bottom: -28px;
  left: -8px;
  border: 8px solid transparent;
  border-top: 17px solid #0028FF;
}

#details {
  margin-bottom: 30px;
}

</style>
