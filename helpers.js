export function parseDate(date) {
  date = String(date).split(' ')
  const days = String(date[0]).split('-')
  const hours = String(date[1]).split(':')
  return [
    parseInt(days[0]),
    parseInt(days[1]) - 1,
    parseInt(days[2]),
    parseInt(hours[0]),
    parseInt(hours[1]),
    parseInt(hours[2])
  ]
}

export function fixTilesGap() {
  var originalInitTile = L.GridLayer.prototype._initTile
  L.GridLayer.include({
    _initTile: function(tile) {
      originalInitTile.call(this, tile)

      let tileSize = this.getTileSize()

      tile.style.width = tileSize.x + 1 + 'px'
      tile.style.height = tileSize.y + 1 + 'px'
    }
  })
}

export function declOfNum(number, titles) {
  const cases = [2, 0, 1, 1, 1, 2]
  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ]
}

export function preload(imageArray, index) {
  index = index || 0

  if (imageArray && imageArray.length > index) {
    const img = new Image()

    img.onload = function() {
      preload(imageArray, index + 1)
    }

    img.src = images[index]['serving_url']
  }
}

export function createTreeStruct(arr, parent) {
  let out = []

  for (let i in arr) {
    if (arr[i].parent_id == parent) {
      let children = createTreeStruct(arr, arr[i].id)

      if (children.length) {
        arr[i].children = children
      }

      out.push(arr[i])
    }
  }

  return out
}

export function delay(duration = 0) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve()
    }, duration)
  })
}

export function sleep() {
  return delay.apply(this, arguments)
}

export function setDangerousHtml(html, el) {
  if (el === null) return
  const range = document.createRange()
  range.selectNodeContents(el)
  range.deleteContents()
  el.appendChild(range.createContextualFragment(html))
}

export function copyToClipboard(
  val,
  callback = () => {
    alert('Ссылка скопирована в буфер обмена')
  }
) {
  const el = document.createElement('textarea')

  el.value = val
  document.body.appendChild(el)
  el.select()

  document.execCommand('copy')
  document.body.removeChild(el)

  callback()
}
