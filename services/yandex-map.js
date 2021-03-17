let yandexLoaded = false

function Map(options) {
  var that = this
  this.options = Object.assign(
    {},
    {
      apiKey: null,
      mapCenter: null,
      mapContainer: null,
      mapControls: ['zoomControl'],
      mapInitialZoom: 17,
      mapMaxZoom: 18,
      placemarks: [],
      beforeMapLoaded: function() {},
      afterMapLoaded: function() {},
      afterPlacemarksCreated: function() {
        that.fitIntoView()
      },
      getMapCenter: function() {
        return that.options.mapCenter
      },
      getPlacemark: function(placemark) {
        return placemark
      }
    },
    options
  )

  if (null === this.options.apiKey) {
    throw Error('Invalid YandexApiKey')
  }

  if (null === this.options.mapContainer || null === this.options.mapCenter) {
    throw Error('Invalid map arguments')
  }

  this.loadYandexApi()
}

Object.assign(Map.prototype, {
  map: null,
  loader: null,
  apiIsReady: false,

  placemarks: [],
  placemarksGroups: {},

  loadYandexApi: function() {
    if (this.apiIsReady) {
      return
    }

    var that = this
    this.options.beforeMapLoaded.call(this)

    if (yandexLoaded) {
      ymaps.ready(function() {
        that.createMap()
        that.options.afterMapLoaded.apply(that, arguments)
      })
      return
    }

    loadScriptAsync(
      'https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=' +
        this.options.apiKey,
      function() {
        yandexLoaded = true
        ymaps.ready(function() {
          that.createMap()
          that.apiIsReady = true
          that.options.afterMapLoaded.apply(that, arguments)
        })
      }
    )
  },

  getMapContainer: function() {
    var container = this.options.mapContainer

    if (typeof container === 'string') {
      container = $(container)
    }

    return container
  },

  createMap: function() {
    if (null !== this.map) {
      return
    }

    var container = this.getMapContainer()
    var center = this.options.getMapCenter()

    this.map = new ymaps.Map(container, {
      center: center,
      controls: this.options.mapControls,
      zoom: this.options.mapInitialZoom,
      type: this.options.mapType
    })

    this.map.events.add('click', function(e) {
      var coords = e.get('coords')
      console.log(coords)
    })

    this.createPlacemarks()
  },

  createPlacemark: function(placemark, options) {
    options = Object.assign({}, { parse: true }, options)

    if (options.parse) {
      placemark = this.options.getPlacemark(placemark)
    }

    if (void 0 === placemark.lat || void 0 === placemark.lng) {
      return console.warn('Placemark geog invalid', placemark)
    }

    if (void 0 === placemark.image) {
      placemark.image = {}
    }

    var yplacemark = new ymaps.Placemark(
      [placemark.lat, placemark.lng],
      {
        balloonContentHeader: placemark.header,
        balloonContentBody: placemark.body,
        iconCaption: placemark.caption
      },
      placemark.image
    )

    Object.assign(yplacemark, { data: placemark })

    this.map.geoObjects.add(yplacemark)
    this.placemarks.push(yplacemark)
  },

  createPlacemarks: function() {
    var that = this
    var placemarks = this.options.placemarks

    var rendererFn = function(placemarks) {
      for (var key in placemarks) {
        that.createPlacemark(placemarks[key])
      }

      that.options.afterPlacemarksCreated.call(that)
    }

    if (typeof placemarks === 'function') {
      placemarks().done(response => {
        rendererFn(response.data)
      })
    } else {
      rendererFn(placemarks)
    }
  },

  fitIntoView: function(options) {
    options = Object.assign(
      {},
      {
        zoomMargin: 50,
        checkZoomRange: true
      },
      options
    )

    var bounds = this.map.geoObjects.getBounds()
    if (null === bounds) return

    this.map.setBounds(bounds, options)
  },

  connectWith: function(connector, event, callback) {
    var that = this

    if (typeof connector === 'string') {
      connector = document.querySelector(connector)
    }

    if (typeof event === 'function') {
      callback = event
      event = 'click'
    }

    if (void 0 === callback) {
      callback = function() {}
    }

    connector.on(event, function() {
      callback.apply(that, arguments)
    })
  },

  findPlacemarkById: function(id) {
    return this.findPlacemark(function(elem) {
      return elem.data.id === id
    })[0]
  },

  findPlacemark: function(fn) {
    return $.grep(this.placemarks, fn)
  },

  panToPlacemark: function(placemark) {
    var data = placemark.data
    this.setMapCenter([data.lat, data.lng])
  },

  panToPlacemarkId: function(id) {
    var placemark = this.findPlacemarkById(id)
    if (void 0 === placemark) return
    this.panToPlacemark(placemark)
  },

  setMapCenter: function(coordinates) {
    this.map.setCenter(coordinates, this.options.mapMaxZoom)
  },

  createMapImageOverlay(params) {
    params = Object.assign({}, params, { fitIntoView: true })

    var polygon = new ymaps.Polygon(
      [params.bounds],
      {},
      {
        fillImageHref: params.image,
        strokeWidth: 0
      }
    )

    this.map.geoObjects.add(polygon)

    if (params.fitIntoView) {
      this.fitIntoView()
    }
  },

  setMapType(type) {
    this.map.setType(type)
  },

  showPlacemarksGroup(group) {
    this.setPlacemarksGroupVisibility(group, true)
  },

  hidePlacemarksGroup(group) {
    this.setPlacemarksGroupVisibility(group, false)
  },

  setPlacemarksGroupVisibility(group, visible) {
    for (var key in this.placemarks) {
      var placemark = this.placemarks[key]

      if (group !== placemark.data.group) continue

      placemark.options.set('visible', visible)
      placemark.balloon.close()
    }
  },

  destroy() {
    if (this.map) {
      this.map.destroy()
    }
  }
})
//
function loadScriptAsync(url, callback) {
  var script = document.createElement('script')
  if (script.readyState) {
    script.onreadystatechange = function() {
      if (script.readyState == 'loaded' || script.readyState == 'complete') {
        script.onreadystatechange = null
        callback()
      }
    }
  } else {
    script.onload = function() {
      callback()
    }
  }

  script.src = url
  document.getElementsByTagName('head')[0].appendChild(script)
}

Map.constants = {
  HYBRID: 'yandex#hybrid',
  SCHEME: 'yandex#map'
}

export { Map }
