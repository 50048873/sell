import _dateFormat from 'dateformat'

export let dateFormat = {
	methods: {
		dateFormat(time, formatter) {
            return _dateFormat(time, formatter)
        }
	},
	filters: {
		dateFormat(time, formatter) {
            return _dateFormat(time, formatter)
        }
	}
}

export let getRatingsSelectTypes = {
	methods: {
		getRatingsSelectTypes(types, ratings) {
              let all = 0,
	              recommend = 0,
	              shit = 0
	          ratings.forEach((item) => {
	              let rateType = item.rateType
	              if (rateType === 0) {
	                  recommend++
	              } else if (rateType === 1) {
	                  shit++
	              }
	          })
	          all = recommend + shit

	          types[0].count = all
	          types[1].count = recommend
	          types[2].count = shit

	          return types
        }
	}
}