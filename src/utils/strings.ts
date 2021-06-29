import { Optional } from '@/utils/optional'

function trimToOptional(str: string | undefined): Optional<string> {
    return Optional.ofNullable(str)
        .map((s) => s.trim())
        .filter((s) => s != '')
}


export {trimToOptional};
