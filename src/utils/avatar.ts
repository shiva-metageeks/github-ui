import { createAvatar } from '@dicebear/core';
import { botttsNeutral ,identicon , rings} from '@dicebear/collection';

export const generateAvatar = (seed: string | number,style?:"identicon" | "rings") => {
const styles = {
    "identicon":identicon,
    "rings":rings
}
    const avatar = createAvatar( (style && styles[style])|| botttsNeutral, {
        seed:`${seed}`
    });

    const svg = avatar.toDataUri();
    return svg
}