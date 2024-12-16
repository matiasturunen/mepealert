<template>
  <div class="container-lg">
    <div class="row">
      <div class="col">
        <Logo page="generator" />
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
                  <input type="text" name="input-alertPrefix" id="input-alertPrefix" v-model="alertPrefix" placeholder="HÄLYTYS V EK 108">
                </div>
              </div>
            </div>
            <div class="container">
              <div class="row">
                <div class="col">
                  <label for="input-alertMessage" class="form-label">Kuvaus</label>
                  <input type="text" name="input-alertMessage" id="input-alertMessage" v-model="alertMessage" placeholder="Lappeenranta, Tuulisukka">
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
                  <input type="text" name="input-alertUnit" id="input-alertUnit" v-model="alertUnit" placeholder="VEK108">
                  <a href="#" @click="addUnit">Lisää yksikkö</a>
                </div>
              </div>
            </div>
          </form>
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
    </div>
    <div class="row">
      <div class="col">
        <button class="btn btn-primary" @click="submitForm">
          Luo viesti
        </button>
      </div>
    </div>
    <div class="row">
      <div id="details" class="col-md-3 col-sm-12">
        <strong>Hälyviesti:</strong><br>
        <form>
          <textarea cols="25" rows=6 readonly v-model="generatedAlert">
          </textarea>
        </form>
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
      await fetch('/api/alert/generator', {
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
      if (this.alertUnit.length > 0) {
        this.alertUnits.push(this.alertUnit);
        this.alertUnit = '';
      }
    }
  }
}
</script>
