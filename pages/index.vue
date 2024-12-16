<script setup>
import { ref } from 'vue'
import Navigation from '~/components/Navigation.vue';

const alertText = ref('')
const errorMessage = ref('')
const parsed = ref({})

const mapbox = {}

const submitForm = async (evt) => {
  errorMessage.value = '';
  evt.preventDefault()
  await fetch('/api/alert/parse', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      alert: alertText.value
    })
  }).then(response => response.json()).then((data) => {
    console.log('RES', data)

    parsed.value = data

    $('.marker').remove();
    const el = document.createElement('div');
    el.className = 'marker';

    new mapboxgl.Marker(el)
      .setLngLat([data.lon, data.lat])
      .addTo(mapbox.map);

    // Scroll to map
    $([document.documentElement, document.body]).animate({
      scrollTop: $('#map').offset().top - 10
    }, 1500);

    // Center map on marker
    mapbox.map.flyTo({
      center: [data.lon, data.lat],
      zoom: 10
    });

  }).catch((err) => {
    if (err) {
      $('.marker').remove();
      console.error(err);
      errorMessage.value = 'Parsinnassa tapahtui virhe';
    }
  })
}

onMounted(async () => {
  const data = await $fetch('/api/token')

  mapboxgl.accessToken = data.token

  mapbox.map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 10,
    center: [28.3, 61.2]
  })
})


</script>

<template>
  <div class="container-lg">
    <div class="row">
      <div class="col">
        <Logo page="parse" />
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
          <b>Tehtäväkoodi:&nbsp;</b>{{ parsed.missionCode }}
        </p>
        <p>
          <b>Tehtäväkuvaus:&nbsp;</b>{{ parsed.missionDescription }}
        </p>
        <p>
          <b>Kuvaus:&nbsp;</b>{{ parsed.description }}
        </p>
        <p>
          <b>Yksiköt:&nbsp;</b>{{ parsed.units }}
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
