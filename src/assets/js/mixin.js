import _dateFormat from 'dateformat'

export let dateFormat = {
	methods: {
		dateFormat(time, formatter) {
            return _dateFormat(time, formatter)
        }
	}
}