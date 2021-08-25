import {createDecorator} from "vue-class-component";

const Watch = (valueKey: string) => createDecorator((options, key) => {
    if (!options.watch) {
        options.watch = {}
    }
    options.watch[valueKey] = key
})

export default Watch;