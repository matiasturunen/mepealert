<template>
  <div class="container-lg">
    <div class="row">
      <div class="col">
        <Logo />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h1 class="title">
          Mepe hälyparseri
        </h1>
      </div>
    </div>
    <div class="row">
      <div class="col" id="inputs_box">
        <div class="mb-3">
          <label for="input-alertText" class="form-label">Hälytyksen sisältö</label>
          <textarea
            v-model="alertText"
            rows="6"
            cols="40"
            class="form-control"
          ></textarea>
        </div>
        <div class="mb-3">
          <button class="btn btn-primary" @click="submitForm">
            Näytä kartalla
          </button>
        </div>
      </div>
    </div>
    <div id="errors" class="row" v-if="errorMessage != ''">
      <div class="col">
        <p>{{ errorMessage }}</p>  
      </div>
    </div>
    <div class="row">
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

#map {
  width: 100%;
  min-height: 250px;
}

@media (max-width: 576px) {
  #map {
    height: 350px;
  }
}

@media (max-width: 768) {
  #map {
    height: 420px;
  }
}

@media (max-width: 992) {
  #map {
    height: 500px;
  }
}

@media (min-width: 992.02px) {
  #map {
    height: 600px;
  }
}

</style>
