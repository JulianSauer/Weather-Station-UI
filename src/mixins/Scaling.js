export default {
    methods: {
        scaleDown(value, roundDownBy, min) {
            value = Math.round(value) - 1
            value = value - (value % roundDownBy)
            if (value < min) {
                return min
            }
            return value
        },
        scaleUp(value, roundUpBy, max) {
            value = Math.round(value) + 1
            value = value + (roundUpBy - (value % roundUpBy))
            if (value > max) {
                return max
            }
            return value
        },
        isSmallDevice() {
            return this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm'
        }
    }
}
