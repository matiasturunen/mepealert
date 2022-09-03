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
          Mepe hälygeneraattori
        </h1>
      </div>
    </div>
    <div class="row">
      <div class="col" id="inputs_box">
        <div class="mb-3">
          <form>
            <div class="container">
              <div class="row">
                <div class="col">
                  <label for="input-alertPrefix" class="form-label">Prefixi</label>
                  <input type="text" name="input-alertPrefix" id="input-alertPrefix" v-model="alertPrefix">
                </div>
              </div>
            </div>
            <div class="container">
              <div class="row">
                <div class="col">
                  <label for="input-alertMessage" class="form-label">Kuvaus</label>
                  <input type="text" name="input-alertMessage" id="input-alertMessage" v-model="alertMessage">
                </div>
              </div>
            </div>
            <div class="container">
              <div class="row">
                <div class="col">
                  <label for="input-alertCode" class="form-label">Tehtäväkoodi</label>
                  <select v-model="alertCode" @change="alertCodeChanged">
                    <option v-for="code in alertCodes" :value="code.value">
                      {{ code.value }}&nbsp;{{ code.text }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="container">
              <div class="row">
                <div class="col">
                  <label for="input-alertUrgency" class="form-label">Kiireellisyys</label>
                  <select v-model="alertUrgency">
                    <option v-for="urg in urgencies" :value="urg">
                      {{ urg }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="container">
              <div class="row">
                <div class="col">
                  <label for="input-alertUnit" class="form-label">Yksiköt</label>
                  <div v-if="!alertUnits.length">
                    <p>Ei yksiköitä!</p>
                  </div>
                  <div v-else>
                    <ul>
                      <li v-for="unit in alertUnits">
                        {{ unit }}
                      </li>
                    </ul>
                  </div>
                  <input type="text" name="input-alertUnit" id="input-alertUnit" v-model="alertUnit">
                  <a href="#" @click="addUnit">Lisää yksikkö</a>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="mb-3">
          <button class="btn btn-primary" @click="submitForm">
            Luo viesti
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
      <div id="map" class="col-md-9 col-sm-12" />
      <div id="details" class="col-md-3 col-sm-12">
        <p><b>Hälyviesti:&nbsp;</b>{{ generatedAlert }}</p>
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
      alertUnits: [],
      alertMessage: '',
      alertCode: '',
      alertUrgency: '',
      alertCoordinates: '',
      alertPrefix: '',
      errorMessage: '',
      map: {},
      marker: null,
      generatedAlert: '',
      alertCodes: [],
      urgencies: ['A', 'B', 'C', 'D'],
      alertUnit: ''
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
      });

      this.map.on('load', this.mapLoaded);
    }).catch((err) => {
      console.error(err)
    })

    await fetch('/api/data/alertcodes', {
      method: 'GET'
    }).then(response => response.json()).then((data) => {
      this.alertCodes = data.codes;
    }).catch((err) => {
      if (err) {
        console.error(err)
      }
    });
  },
  methods: {
    async submitForm (evt) {
      evt.preventDefault()
      await fetch('/api/alert/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          code: this.alertCode,
          units: this.alertUnits,
          message: this.alertMessage,
          urgency: this.alertUrgency,
          coordinates: this.alertCoordinates,
          prefix: this.alertPrefix
        })
      }).then(response => response.json()).then((data) => {
        console.log('GEN RES', data);
        this.generatedAlert = data.alert;
      }).catch((err) => {
        if (err) {
          console.error(err)
          if (err.status == 400) {
            this.errorMessage = 'Tarkista syöte'
          }
        }
      })
    },
    alertCodeChanged (evt) {
      for (let i = 0; i < this.alertCodes.length; i++) {
        const c = this.alertCodes[i];
        if (c.value == this.alertCode) {
          this.urgencies = c.urgency.split('');
        }
      }
    },
    mapLoaded () {
      this.map.getCanvas().style.cursor = 'pointer';

      const el = document.createElement('div');
      el.className = 'marker';

      this.marker = new mapboxgl.Marker(el)
        .setLngLat([0, 0])
        .addTo(this.map);

      this.map.on('click', (evt) => {
        const coords = evt.lngLat;
        this.alertCoordinates = coords;
        this.marker.setLngLat(coords).addTo(this.map);
      });
    },
    addUnit (evt) {
      evt.preventDefault();
      this.alertUnits.push(this.alertUnit);
      this.alertUnit = '';
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
