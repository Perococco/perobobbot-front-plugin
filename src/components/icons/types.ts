enum IconMode {
    DEFAULT = "DEFAULT",
    NEUTRAL = "NEUTRAL",
    DANGER = "DANGER",
    WARNING = "WARNING",
}

enum IconType {
    TRASH = "TRASH",
    REFRESH = "REFRESH",
    PLUS = "PLUS",
    UNKNOWN = "UNKNOWN"
}

enum IconSize {
    SIZE_5 = 5,
    SIZE_4 = 4,
    SIZE_3 = 3,
}

function getSizeStyle(size:IconSize):string {
    const s = size??IconSize.SIZE_5;
    return IconSizes[s]??IconSizes[IconSize.SIZE_5];
}

function getColorStyle(mode:IconMode):string {
    const s = mode??IconMode.WARNING;
    return IconColors[s]??IconColors[IconMode.WARNING];
}


function computeStyle(size: IconSize, mode: IconMode): string {
    const s: IconSize = size ?? IconSize.SIZE_5;
    const size_style = getSizeStyle(size);
    const color_style = getColorStyle(mode);
    return `${size_style} ${color_style}`
}


const IconSizes = {
    SIZE_3: "h-3 w-3",
    SIZE_4: "h-4 w-4",
    SIZE_5: "h-5 w-5",
}

const IconColors = {
    DEFAULT: 'text-gray-900 hover:text-gray-600',
    NEUTRAL: 'text-gray-900 hover:text-gray-600',
    DANGER: 'text-red-400 hover:text-red-600',
    WARNING: 'text-yellow-400 hover:text-yellow-600',
}

export {IconType, IconMode, IconSize, computeStyle}