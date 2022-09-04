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
          <form>
            <textarea
              v-model="alertText"
              rows="6"
              cols="40"
              class="form-control"
              id="input-alertText"
            ></textarea>
          </form>
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
      <div id="map" class="col-md-9 col-sm-12"></div>
      <div id="details" class="col-md-3 col-sm-12">
        <p>
          <b>Tehtäväkoodi:&nbsp;</b>{{ missionCode }}
        </p>
        <p>
          <b>Tehtäväkuvaus:&nbsp;</b>{{ missionDescription }}
        </p>
        <p>
          <b>Kuvaus:&nbsp;</b>{{ description }}
        </p>
        <p>
          <b>Yksiköt:&nbsp;</b>{{ units }}
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <Navigation />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <hr>
        <small class="text-muted">&copy;&nbsp;Matias Turunen</small>
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
      missionCode: '',
      missionDescription: ''
    }
  },
  mounted: async function () {
    await fetch('/api/token', {
      method: 'GET'
    }).then(response => response.json()).then((data) => {
      mapboxgl.accessToken = data.token

      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 10,
        center: [28.3, 61.2]
      })
    }).catch((err) => {
      if (err) {
        console.error(err)
        this.errorMessage = ''
      }
    })
  },
  methods: {
    async submitForm (evt) {
      evt.preventDefault()
      await fetch('/api/alert/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          alert: this.alertText
        })
      }).then(response => response.json()).then((data) => {
        console.log('RES', data)
        $('.marker').remove();
        const el = document.createElement('div');
        el.className = 'marker';

        new mapboxgl.Marker(el)
          .setLngLat([data.lon, data.lat])
          .addTo(this.map);

        // Scroll to map
        $([document.documentElement, document.body]).animate({
          scrollTop: $('#map').offset().top - 10
        }, 1500);

        // Center map on marker
        this.map.flyTo({
          center: [data.lon, data.lat],
          zoom: 10
        });

        this.missionCode = data.missionCode
        this.units = data.units
        this.description = data.description
        this.missionDescription = data.missionDescription
      }).catch((err) => {
        if (err) {
          $('.marker').remove();
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
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 10px;
  margin-top: 10px;
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

.marker {
  position: absolute;
  margin-top: -25px;
  border-radius: 50%;
  border: 8px solid #FF0000;
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
  border-top: 17px solid #FF0000;
}

</style>
