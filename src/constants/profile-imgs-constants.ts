import bt21vanSvg from '../assets/profile-pics/bt21-van.svg'
import cookySvg from '../assets/profile-pics/cooky.svg'
import darthvaderSvg from '../assets/profile-pics/darth-vader.svg'
import ironmanSvg from '../assets/profile-pics/iron-man.svg'
import jakeSvg from '../assets/profile-pics/jake.svg'
import koyaSvg from '../assets/profile-pics/koya.svg'
import pennywiseSvg from '../assets/profile-pics/pennywise.svg'
import screamSvg from '../assets/profile-pics/scream.svg'
import stitchSvg from '../assets/profile-pics/stich.svg'
import stormtrooperSvg from '../assets/profile-pics/stormtrooper.svg'
import supermarioSvg from '../assets/profile-pics/super-mario.svg'

export const PROFILE_IMAGES = [
    bt21vanSvg,
    cookySvg,
    darthvaderSvg,
    ironmanSvg,
    jakeSvg,
    koyaSvg,
    pennywiseSvg,
    screamSvg,
    stitchSvg,
    stormtrooperSvg,
    supermarioSvg
]

export const PROFILE_IMAGES_TEXTS = [
    'Bt21 Van',
    'Cooky',
    'Darth Vader',
    'Ironman',
    'Jake',
    'Koya',
    'Pennywise',
    'Scream',
    'Stitch',
    'Stormtrooper',
    'Supermario'
]

export const PROFILE_IMAGES_LENGTH = PROFILE_IMAGES.length


export function getProfileImageByIndex(index: number) {
    return PROFILE_IMAGES[index] || PROFILE_IMAGES[0]
}

export function getProfileImageTextByIndex(index: number) {
    return PROFILE_IMAGES_TEXTS[index] || PROFILE_IMAGES_TEXTS[0]
}