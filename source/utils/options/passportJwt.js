// Core
import { ExtractJwt } from 'passport-jwt';

// Instruments
import { getPassword } from '../env';

export const passportJwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:    getPassword(),
};
