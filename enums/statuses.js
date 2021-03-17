export default {
  sale: 0,
  sold: 1,
  reserved: 2,

  getColor: function(status) {
    switch (status) {
      case this.sale:
        return 'transparent'
      case this.sold:
        return '#646464'
      case this.reserved:
        return '#FF4646'
    }
  },

  getTextColor: function(status) {
    switch (status) {
      case this.sale:
        return '#FF8200'
      case this.sold:
        return '#646464'
      case this.reserved:
        return '#FF4646'
    }
  },

  getName: function(status) {
    switch (status) {
      case this.sale:
        return 'В продаже'
      case this.sold:
        return 'Продано'
      case this.reserved:
        return 'Забронировано'
    }
  }
}
