export default {
    methods: {
        convertStringToDate: function (t) { // Format: YYYYMMDD-hhmmss
            return new Date(t.slice(0, 4) + '-' + t.slice(4, 6) + '-' + t.slice(6, 8) + 'T' + t.slice(9, 11) + ':' + t.slice(11, 13) + ':' + t.slice(13, 15))
        },
        formatDate(date, format) {
            let dateString = date.toLocaleString('de-DE', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}) // DD.MM.YYYY, hh:mm:ss
            let result = format
            result = result.replace('YYYY', dateString.slice(6, 10))
            result = result.replace('MM', dateString.slice(3, 5))
            result = result.replace('DD', dateString.slice(0, 2))
            result = result.replace('hh', dateString.slice(12, 14))
            result = result.replace('mm', dateString.slice(15, 17))
            result = result.replace('ss', dateString.slice(18, 20))
            return result
        }
    }
}
